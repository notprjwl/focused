import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import UpdateModal from "./UpdateModal";
import { Funnel } from "@heroicons/react/outline";
import useFetch from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = () => {
  const BASE_URL = process.env.REACT_APP_SERVER_API;
  const { workouts: initialWorkout, loading, error } = useFetch(`${BASE_URL}/api/workouts`);
  const { user } = useAuthContext();

  // const newCreatedAt = workout.createdAt.slice(0, 10);
  const { dispatch } = useWorkoutsContext();

  const [workout, setWorkout] = useState(initialWorkout);
  const [modal, setModal] = useState(false);
  const [transition, setTransition] = useState(false);
  const [sortOrder, setSortOrder] = useState([]); // Initial sort order

  //for checkbox, selecting, updating, deleting
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [updateButtonEnabled, setUpdateButtonEnabled] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [showUpdateDeleteButtons, setShowUpdateDeleteButtons] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState(null);

  //for search function
  const [searchQuery, setSearchQuery] = useState("");

  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //for sorting the columns
  const [titleSortOrder, setTitleSortOrder] = useState(null);
  const [weightSortOrder, setWeightSortOrder] = useState(null);
  const [setsSortOrder, setSetsSortOrder] = useState(null);
  const [repsSortOrder, setRepsSortOrder] = useState(null);

  //whenever we refresh the page or it loads for the first time the sorting should be initail like in the database
  useEffect(() => {
    // Initial rendering, no sorting
    setWorkout(initialWorkout);
  }, [initialWorkout]);

  // const handleSortToggle = () => {
  //   // Toggle the sort order when the <th> is clicked
  //   // setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  //   setSortOrder((prevSortOrder)=> (prevSortOrder === "asc" ? "desc" : "asc"))
  // };

  const handleSortToggle = (columnName) => {
    // console.log("clicked on column:", columnName);

    setSortOrder((prevSortOrder) => {
      const newSortOrder = { ...prevSortOrder };

      // Reset sort order for other columns
      Object.keys(newSortOrder).forEach((key) => {
        if (key !== columnName) {
          newSortOrder[key] = null;
        }
      });
      // Toggle the sort order if it was already set, otherwise set it to "asc"
      newSortOrder[columnName] = newSortOrder[columnName] === "asc" ? "desc" : "asc";

      return newSortOrder;
    });
  };

  // useEffect(() => {
  //   const sortedWorkout = [...workout].sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.title.localeCompare(b.title);
  //     } else {
  //       return b.title.localeCompare(a.title);
  //     }
  //   });
  //   setWorkout(sortedWorkout);
  // }, [sortOrder]);

  // useEffect(() => {
  //   const sortedWorkout = [...workout].sort((a, b) => {
  //     return Object.keys(sortOrder).reduce((acc, columnName) => {
  //       const columnA = a[columnName] ? a[columnName].toString().toLowerCase() : "";
  //       const columnB = b[columnName] ? b[columnName].toString().toLowerCase() : "";

  //       if (acc !== 0) return acc;

  //       if (sortOrder[columnName] === "asc") {
  //         return columnA.localeCompare(columnB);
  //       } else {
  //         return columnB.localeCompare(columnA);
  //       }
  //     }, 0);
  //   });
  //   setWorkout(sortedWorkout);
  // }, [sortOrder, workout]);

  useEffect(() => {
    const prevSortOrder = { ...sortOrder };
    const sortedWorkout = [...initialWorkout].sort((a, b) => {
      let comparison = 0;

      Object.keys(sortOrder).some((columnName) => {
        let columnA, columnB;

        if (columnName === "weight" || columnName === "sets" || columnName === "reps") {
          columnA = parseFloat(a[columnName]);
          columnB = parseFloat(b[columnName]);
        } else if (columnName === "title") {
          // Handle numeric values in 'Exercise Name' column
          columnA = a[columnName];
          columnB = b[columnName];
          const numericA = parseFloat(columnA);
          const numericB = parseFloat(columnB);

          if (!isNaN(numericA) && !isNaN(numericB)) {
            columnA = numericA;
            columnB = numericB;
          }
        } else {
          columnA = a[columnName] ? a[columnName].toString().toLowerCase() : "";
          columnB = b[columnName] ? b[columnName].toString().toLowerCase() : "";
        }

        if (columnA < columnB) {
          comparison = -1;
        } else if (columnA > columnB) {
          comparison = 1;
        }

        if (sortOrder[columnName] === "desc") {
          comparison *= -1;
        }

        return comparison !== 0;
      });

      return comparison;
    });
    setWorkout(sortedWorkout);
  }, [sortOrder, initialWorkout]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 10);
    return () => clearTimeout(timeOut);
  }, [setTransition]);

  const handleSelectAllChange = (event) => {
    const allWorkoutIds = workout.map((workout) => workout._id);
    setSelectedWorkouts(event.target.checked ? allWorkoutIds : []);
  };

  //DELETE
  const handleDelete = async () => {
    if (!user) {
      // throw new Error('You must be logged in');
      return;
    }
    // Check if any workout is selected for deletion
    if (selectedWorkouts.length === 0) {
      // No workout selected, handle accordingly (show a message or do nothing)
      return;
    }
    // Assuming you want to delete all selected workouts
    const workoutIdsToDelete = selectedWorkouts;

    // Loop through the selected workout IDs and delete each one
    for (const workoutIdToDelete of workoutIdsToDelete) {
      const BASE_URL = process.env.REACT_APP_SERVER_API;

      const response = await fetch(`${BASE_URL}/api/workouts/` + workoutIdToDelete, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        const { workouts: updatedWorkouts } = json;
        dispatch({ type: "DELETE_WORKOUT", payload: workoutIdToDelete });
        setWorkout(updatedWorkouts);
      }
    }

    // Clear the selected workouts after deletion
    setSelectedWorkouts([]);
    setDeleteButtonEnabled(false);
  };

  const handleUpdate = () => {
    if (setWorkoutToUpdate) {
      setModal(true);
    }
  };

  // const ismodalOpen = () => {
  //   console.log("modal is open");
  //   setModal(true);
  // };
  const isModalClose = () => {
    setModal(false);
    setSelectedWorkouts([]);
  };

  useEffect(() => {
    const rows = document.querySelectorAll(".swipe-in");
    rows.forEach((row, index) => {
      row.classList.add("animate-swipe-in");
      row.style.animationDelay = `${index * 0.01}s`;
    });
  }, [workout]);

  const handleCheckboxChange = (workoutId, title, weight, sets, reps) => {
    setSelectedWorkouts((prevSelectedWorkouts) => {
      const isSelected = prevSelectedWorkouts.includes(workoutId);

      if (isSelected) {
        const updatedWorkouts = prevSelectedWorkouts.filter((id) => id !== workoutId);
        setWorkoutToUpdate(null);
        // console.log(updatedWorkouts);
        return updatedWorkouts;
      } else {
        const updatedWorkouts = [...prevSelectedWorkouts, workoutId];
        // console.log(updatedWorkouts);
        setWorkoutToUpdate({ _id: workoutId, title, weight, sets, reps });
        return updatedWorkouts;
      }
    });
  };

  const handleCheckboxClick = () => {
    setDeleteButtonEnabled(selectedWorkouts.length > 0);
    setUpdateButtonEnabled(selectedWorkouts.length === 1);
    setShowFilter(selectedWorkouts.length === 0);
    setShowUpdateDeleteButtons(selectedWorkouts.length > 0);
  };

  useEffect(() => {
    handleCheckboxClick();
  }, [selectedWorkouts]);

  //search function
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
  };

  const filteredWorkouts = workout && Array.isArray(workout) ? workout.filter((workout) => !searchQuery || workout.title.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  useEffect(() => {
    if (!workout || workout.length === 0) {
      setSelectedWorkouts([]);
      setDeleteButtonEnabled(false);
      setUpdateButtonEnabled(false);
    }
  }, [workout]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value, 10)); //converts the value from string to an integer using base 10
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //for pagination
  const totalWorkouts = filteredWorkouts ? filteredWorkouts.length : 0;
  const totalPages = Math.ceil(totalWorkouts / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkouts = filteredWorkouts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <body className='p-2'>
      <div className='text-textTint bg-[#1b1b1c] pt-2 sm:pt-5 mx-auto rounded-3xl border-[1px] border-[#37383c]'>
        <div className='items-center overflow-x-auto'>
          <div className='px-10 py-4 flex justify-between items-center text-center'>
            <label className='input input-bordered flex items-center max-w-[25%] h-[40px] overflow-hidden hover:overflow-x px-3 bg-[#1b1b1c]'>
              <input type='text' className='grow sm:text-sm sm:placeholder:text-xs placeholder:text-[#a5a5a5] focus:border-0' placeholder='Search' onChange={handleSearchChange} />
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70 text-[#a5a5a5]'>
                <path fillRule='evenodd' d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z' clipRule='evenodd' />
              </svg>
            </label>
            {selectedWorkouts.length === 0 ? <h1 className='justify-center text-2xl sm:text-sm md:text-sm lg:text-lg font-bold xxl:mr-[10px] max-w-[25%] transition-all duration-200 ease-in-out'>EXERCISE LOG</h1> : <h1 className='justify-center sm:text-sm md:text-sm lg:text-lg font-bold xxl:mr-[10px] w-[25%] transition-all duration-800 ease-in-out'>{`${selectedWorkouts.length} selected`}</h1>}
            {showFilter && (
              <div className='flex justify-end min-w-[25%]'>
                <div className='dropdown dropdown-bottom dropdown-end h-10 justify-center text-lg sm:text-xs md:text-2xl'>
                  <div tabIndex={0} role='button' className='btn-sm sm:btn-sm bg-transparent transition-all duration-300 ease-in-out mt-2'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 transition-all duration-300 ease-in-out'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z' />
                    </svg>
                  </div>
                  <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[7rem]'>
                    <li>
                      <a>By Date</a>
                    </li>
                    <li>
                      <a>By Reps</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {showUpdateDeleteButtons && (
              <div className='flex justify-end rounded-b-3xl gap-5 min-w-[25%] transition-all duration-500 ease-in-out'>
                {updateButtonEnabled && (
                  <button onClick={handleUpdate} className='cursor-pointer'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10' />
                    </svg>
                  </button>
                )}
                <button onClick={handleDelete} className='cursor-pointer'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <table className='table-auto mx-auto sm:w-full md:w-full lg:w-[100%] xl:w-[100%] swipe-in  '>
            <thead className='border-b-[1px] border-text'>
              <tr className='justify-start'>
                <th>
                  <input key={initialWorkout._id} type='checkbox' className='checkbox text-center align-middle ml-2' onChange={handleSelectAllChange} checked={filteredWorkouts && initialWorkout && initialWorkout.length > 0 ? selectedWorkouts.length === initialWorkout.length : false} />
                </th>
                <th className='px-2 py-2 sm:px-3 w-[30%] text-lg sm:text-xs md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group text-lg sm:text-xs md:text-2xl whitespace-nowrap text-wrap'>
                    <span onClick={() => handleSortToggle("title")} className='cursor-pointer'>
                      Exercise Name
                    </span>
                    {sortOrder["title"] && (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 sm:w-4 mt-1 transition-all duration-500 ease-in-out ${sortOrder["title"] === "asc" ? "rotate-0" : "rotate-180"} opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                        <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                      </svg>
                    )}
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-0 w-[10%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span className='cursor-pointer' onClick={() => handleSortToggle("weight")}>
                      Weight
                    </span>
                    {sortOrder["weight"] && (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 sm:w-4 mt-1 transition-all duration-500 ease-in-out ${sortOrder["weight"] === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                        <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                      </svg>
                    )}
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-0 w-[10%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group' onClick={() => handleSortToggle("sets")}>
                    <span className='cursor-pointer'>Sets</span>
                    {sortOrder["sets"] && (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 sm:w-4 mt-1 transition-all duration-500 ease-in-out ${sortOrder["sets"] === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                        <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                      </svg>
                    )}
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-0 w-[5%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span className='cursor-pointer' onClick={() => handleSortToggle("reps")}>
                      Reps
                    </span>
                    {sortOrder["reps"] && (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 sm:w-4 mt-1 transition-all duration-500 ease-in-out ${sortOrder["reps"] === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                        <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                      </svg>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={``}>
              {currentWorkouts && currentWorkouts.length > 0 ? (
                currentWorkouts.map((workout) => (
                  <tr key={workout._id} className='text-left border-t-[1px] border-[#37383c] swipe-in transition-all duration-500 ease-in-out'>
                    <td className='w-[1%] pl-3'>
                      <input
                        key={workout._id}
                        type='checkbox'
                        className='checkbox text-center align-middle'
                        onChange={() => {
                          handleCheckboxChange(workout._id, workout.title, workout.weight, workout.sets, workout.reps);
                        }}
                        checked={selectedWorkouts.includes(workout._id)}
                      />
                    </td>
                    <td className='px-2 py-2 sm:px-3 text-1xl sm:text-base md:text-lg pt-2'>
                      {workout.title
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </td>
                    <td className='px-2 py-2 sm:px-3 text-1xl sm:text-base md:text-lg'>{workout.weight}</td>
                    <td className='px-2 py-2 sm:px-3 text-1xl sm:text-base md:text-lg'>{workout.sets}</td>
                    <td className='px-2 py-2 sm:px-3 text-1xl sm:text-base md:text-lg'>{workout.reps}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center py-4'>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className=' bg-[#2c2c2c] rounded-b-3xl px-3 sm:p-1 h-10 transition duration-500 ease-in-out'>
          <div className='flex justify-end gap-10 items-center text-md sm:text-xs md:text-2xl'>
            <div>
              <select name='' id='' className='btn btn-sm p-0 rounded-2xl bg-[#1b1b1c] focus:bg-black focus:outline-0  hover:bg-black transition-all duration-500 ease-in-out cursor-pointer' value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}>
                <option value='5' className='bg-black'>
                  5
                </option>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='25'>25</option>
              </select>
            </div>
            <div>
              <h1 className='text-white font-sans'>{`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, totalWorkouts)} of ${totalWorkouts}`}</h1>
            </div>
            <div className='join p-1 '>
              <button className='join-item btn btn-sm sm:btn-xs md:btn-xs lg:btn-sm rounded-2xl bg-[#2c2c2c] disabled:bg-[#2c2c2c]  transition duration-500 ease-in-out border-0 ' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </button>
              {/* <button className='join-item btn-sm  bg-background '>Page 22</button> */}
              <button className='join-item btn btn-sm sm:btn-xs md:btn-xs lg:btn-sm rounded-2xl bg-background transition duration-500 ease-in-out border-0 disabled:bg-[#2c2c2c]' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal && workout && (
        <UpdateModal
          closeModal={isModalClose}
          initialValues={{
            title: workoutToUpdate.title,
            weight: workoutToUpdate.weight,
            sets: workoutToUpdate.sets,
            reps: workoutToUpdate.reps,
            _id: workoutToUpdate._id,
          }}
        />
      )}
    </body>
  );
};

export default WorkoutDetails;
