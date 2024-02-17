import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import UpdateModal from "./UpdateModal";
import { Funnel } from "@heroicons/react/outline";
import useFetch from "../hooks/useFetch";

const WorkoutDetails = () => {
  const { workouts: initialWorkout, loading, error } = useFetch("/api/workouts");

  // const newCreatedAt = workout.createdAt.slice(0, 10);
  const { dispatch } = useWorkoutsContext();

  const [workout, setWorkout] = useState(initialWorkout);
  const [modal, setModal] = useState(false);
  const [transition, setTransition] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Initial sort order

  useEffect(() => {
    // Initial rendering, no sorting
    setWorkout(initialWorkout);
  }, [initialWorkout]);

  const handleSortToggle = () => {
    // Toggle the sort order when the <th> is clicked
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const sortedWorkout = [...workout].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setWorkout(sortedWorkout);
  }, [ sortOrder]);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 10);
    return () => clearTimeout(timeOut);
  }, [setTransition]);

  const handleDelete = async () => {
    const response = await fetch("api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const ismodalOpen = () => {
    console.log("modal is open");
    setModal(true);
  };
  const isModalClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const rows = document.querySelectorAll(".swipe-in");
    rows.forEach((row, index) => {
      row.classList.add("animate-swipe-in");
      row.style.animationDelay = `${index * 0.01}s`;
    });
  }, [workout]);

  return (
    <body className='p-2'>
      <div className='text-textTint bg-background pt-2 sm:pt-5 mx-auto rounded-3xl border-[1px] border-text'>
        <div className='items-center overflow-x-auto'>
          <div className='px-10 py-2 flex justify-between items-center text-center'>
            <label className='input input-bordered flex items-center w-[25%] h-[40px]'>
              <input type='text' className='grow' placeholder='Search' />
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'>
                <path fillRule='evenodd' d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z' clipRule='evenodd' />
              </svg>
            </label>
            <h1 className='justify-center sm:text-sm md:text-sm lg:text-lg font-bold xxl:mr-[10px] w-[25%]'>EXERCISE LOG</h1>
            <div className='flex justify-end  w-[25%]'>
              <div className='dropdown dropdown-bottom dropdown-end h-10 justify-center pb-2'>
                <div tabIndex={0} role='button' className='btn m-1 bg-transparent mb-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
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
          </div>
          <table className='table-auto mx-auto sm:w-full md:w-full lg:w-[100%] xl:w-[100%] swipe-in '>
            <thead className='border-b-[1px] border-text'>
              <tr className='justify-start text-left'>
                <th></th>
                <th className='px-2 py-2 sm:px-3 w-[30%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span onClick={handleSortToggle} className='cursor-pointer'>
                      Exercise Name
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 mt-1 transition-all duration-500 ease-in-out ${sortOrder === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                      <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                    </svg>
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-3 w-[10%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span onClick={() => handleSortToggle("weight")} className='cursor-pointer'>
                      Weights
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 mt-1 transition-all duration-500 ease-in-out ${sortOrder === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                      <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                    </svg>
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-3 w-[10%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span onClick={() => handleSortToggle("sets")} className='cursor-pointer'>
                      Sets
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 mt-1 transition-all duration-500 ease-in-out ${sortOrder === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                      <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                    </svg>
                  </div>
                </th>
                <th className='px-2 py-2 sm:px-3 w-[5%] text-lg sm:text-sm md:text-2xl whitespace-nowrap text-wrap'>
                  <div className='flex items-center group'>
                    <span onClick={() => handleSortToggle("reps")} className='cursor-pointer'>
                      Reps
                    </span>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className={`w-8 h-6 mt-1 transition-all duration-500 ease-in-out ${sortOrder === "asc" ? "rotate-0" : "rotate-180"} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block`}>
                      <path fillRule='evenodd' d='M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z' clipRule='evenodd' />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={``}>
              {workout &&
                workout.map((workout) => (
                  <tr key={workout._id} className='text-left border-t-[1px] border-text swipe-in transition-all duration-500 ease-in-out'>
                    <td className='w-[1%] pl-3'>
                      <input key={workout._id} type='checkbox' className='checkbox text-center align-middle' onChange={()=> console.log(workout._id)}/>
                    </td>
                    <td className='px-2 py-2 sm:px-3 text-sm sm:text-base md:text-lg pt-2'>{workout.title}</td>
                    <td className='px-2 py-2  sm:px-3 text-sm sm:text-base md:text-lg'>{workout.weight}</td>
                    <td className='px-2 py-2  sm:px-3 text-sm sm:text-base md:text-lg'>{workout.sets}</td>
                    <td className='px-2 py-2  sm:px-3 text-sm sm:text-base md:text-lg'>{workout.reps}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className=''></div>
        </div>
        <div className=' bg-black rounded-b-3xl px-3 '>hey</div>
      </div>
    </body>
  );
};

export default WorkoutDetails;

// <div className='text-gray-300 font-poppins p-6 shadow-lg mb-9 rounded-lg '>
//   <h4 className='font-bold text-gray-300 mb-3'>{workout.title}</h4>
//   <p>
//     <strong>Weight(kg): </strong>
//     {workout.weight}
//   </p>
//   <p>
//     <strong>Sets: </strong>
//     {workout.sets}
//   </p>
//   <p>
//     <strong>Reps: </strong>
//     {workout.reps}
//   </p>
//   <p>
//     <strong>Created At: </strong>
//     {newCreatedAt}
//   </p>
//   {/* <span className='flex justify-end'>
//     <button className='absolute mt-[-130px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9] transition-all duration-500 ease-in-out' onClick={ismodalOpen}>
//       Update
//     </button>
//   </span>
//   <span className='flex justify-end'>
//     <button className='absolute mt-[-40px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9]' onClick={handleDelete}>
//       Delete
//     </button>
//   </span> */}
//   {modal && (
//     <UpdateModal
//       closeModal={isModalClose}
//       initialValues={{
//         title: workout.title,
//         weight: workout.weight,
//         sets: workout.sets,
//         reps: workout.reps,
//         _id: workout._id
//       }}
//     />
//   )}
// </div>
