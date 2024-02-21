import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const UpdateModal = ({ closeModal, initialValues }) => {
  const [updatedTitle, setUpdatedTitle] = useState(initialValues.title);
  const [updatedWeight, setUpdatedWeight] = useState(initialValues.weight);
  const [updatedSets, setUpdatedSets] = useState(initialValues.sets);
  const [updatedReps, setUpdatedReps] = useState(initialValues.reps);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [transition, setTransition] = useState(false);

  const { dispatch } = useWorkoutsContext();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  }, [setTransition]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedWorkout = {
      title: updatedTitle,
      weight: updatedWeight,
      sets: updatedSets,
      reps: updatedReps,
    };
    console.log(initialValues._id);
    console.log("updatedWorkout:", updatedWorkout);
    const response = await fetch("api/workouts/" + initialValues._id, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error); //error prop in workoutcontroller
      setEmptyFields(json.emptyFields); // setting the error
    } else {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      console.log("workout updated");
      setError(null);
      setEmptyFields([]);
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div onClick={handleOverlayClick} className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 ${transition ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"}`}>
      <div className={`flex justify-center h-[55vh] mt-10 items-center  transition-all duration-500 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"}`}>
        <div className='bg-formBg p-5 mx-auto w-[23rem] h-full shadow-xl rounded-xl'>
          <div className='flex font-sans text-white text-center mb-7 items-center justify-center'>
            <h1 className='font-sans font-bold text-[20px]'>{updatedTitle}</h1>
            <div className='absolute ml-[300px] top-6'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-6 cursor-pointer hover:text-[#fa4137]' onClick={handleClose}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
              </svg>
            </div>
          </div>
          <form onSubmit={handleSubmit} className=''>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Exercise Title</label>
              <input type='text' onChange={(e) => setUpdatedTitle(e.target.value)} value={updatedTitle} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Weight (in kg)</label>
              <input type='number' min='0' onChange={(e) => setUpdatedWeight(e.target.value)} value={updatedWeight} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Sets</label>
              <input type='number' min='0' onChange={(e) => setUpdatedSets(e.target.value)} value={updatedSets} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Reps</label>
              <input type='number' min='0' onChange={(e) => setUpdatedReps(e.target.value)} value={updatedReps} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2 pt-5'>
              <button type='submit' className='text-white text-sm font-semibold  bg-borderFocus border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus hover:bg-green-800 transition-all duration-500 ease-in-out'>
                UPDATE
              </button>
            </div>
            <div className='flex items-center justify-center text-center mt-2'>{error && <span className='bg-error p-2 rounded-lg text-white'>{error}</span>}</div>
          </form>
        </div>
      </div>
    </div>
    // <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center'>
    //     <div className='bg-white p-8 rounded-lg '>
    //         <h2 className='text-2xl font-bold mb-4'>Update Workout</h2>
    //         <form onSubmit={handleSubmit}>
    //             <label className='block mb-2'>
    //                 Title:
    //                 <input type='text' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} name='title' className='border p-2 w-full' />
    //             </label>
    //             <label className='block mb-2'>
    //                 Weight(kg):
    //                 <input type='number' value={updatedWeight} onChange={(e) => setUpdatedWeight(e.target.value)} name='weight' className='border p-2 w-full' />
    //             </label>
    //             <label className='block mb-2'>
    //                 Sets:
    //                 <input type='number' value={updatedSets} onChange={(e) => setUpdatedSets(e.target.value)} name='sets' className='border p-2 w-full' />
    //             </label>
    //             <label className='block mb-2'>
    //                 Reps:
    //                 <input type='number' value={updatedReps} onChange={(e) => setUpdatedReps(e.target.value)} name='reps' className='border p-2 w-full' />
    //             </label>
    //             <div className='flex justify-between mt-5'>
    //                 <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-dark'>
    //                     Update
    //                 </button>
    //                 <button type='button' onClick={handleClose} className='bg-red text-white py-2 px-4 rounded-md hover:bg-red-dark'>
    //                     Close
    //                 </button>
    //             </div>
    //             <div className='flex items-center justify-center text-center mt-2'>{error && <span className='bg-error p-2 rounded-lg text-white'>{error}</span>}</div>
    //         </form>
    //     </div>
    // </div>
  );
};

export default UpdateModal;
