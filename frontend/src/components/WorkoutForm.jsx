import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// import useFetch from "../hooks/useFetch";

const WorkoutForm = ({ closeModal }) => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  }, [setTransition]);

  const handleClose = () => {
    setTransition(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // const { fetchData } = useFetch("/api/workouts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, weight, sets, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error); //error prop in workoutcontroller
      setEmptyFields(json.emptyFields); // setting the error
    }
    if (response.ok) {
      setTitle("");
      setWeight("");
      setSets("");
      setReps(""); // why because when you submit the content in the input field will get deleted
      setError(null);
      setEmptyFields([]);
      handleClose();
      console.log("new workout added:", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div onClick={handleOverlayClick} className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 ${transition ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"}`}>
      <div className={`flex justify-center h-[55vh] mt-10 items-center sm:w-[300px] transition-all duration-500 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"}`}>
        <div className='bg-formBg p-5 mx-auto w-[23rem] shadow-xl rounded-xl transition-all duration-500 ease-in-out'>
          <div className='flex font-sans text-white text-center mb-7 items-center justify-center transition-all duration-500 ease-in-out'>
            <h1 className='font-sans font-bold text-[20px]'>Add a new workout!</h1>
            <div className='absolute ml-[300px] top-15 sm:ml-[250px] transition-all duration-500 ease-in-out'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-6 cursor-pointer hover:text-[#fa4137]' onClick={handleClose}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
              </svg>
            </div>
          </div>
          <form onSubmit={handleSubmit} className=''>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Exercise Title</label>
              <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Weight (in kg)</label>
              <input type='number' min='0' onChange={(e) => setWeight(e.target.value)} value={weight} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Sets</label>
              <input type='number' min='0' onChange={(e) => setSets(e.target.value)} value={sets} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2'>
              <label className='block font-sans font-medium text-sm text-white mb-1'>Reps</label>
              <input type='number' min='0' onChange={(e) => setReps(e.target.value)} value={reps} className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' />
            </div>
            <div className='p-2 pt-5'>
              <button type='submit' className='text-white text-sm font-semibold  bg-borderFocus border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus hover:bg-green-800 transition-all duration-500 ease-in-out'>
                SUBMIT
              </button>
            </div>
            <div className='flex items-center justify-center text-center mt-2 transition-all duration-500 ease-in-out'>{error && <span className='bg-error p-2 rounded-lg text-white'>{error}</span>}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
