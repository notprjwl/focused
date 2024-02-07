import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// import useFetch from "../hooks/useFetch";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  // const { fetchData } = useFetch("/api/workouts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, weight, sets, reps };
    const resp = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    if (!resp.ok) {
      setError(json.error); //error prop in workoutcontroller
    }
    if (resp.ok) {
      setTitle("");
      setWeight("");
      setSets("");
      setReps(""); // why because when you submit the content in the input field will get deleted
      setError(null);
      console.log("new workout added:", json);
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  };

  return (
    <div className='border-2 p-5 rounded-xl'>
      <form onSubmit={handleSubmit} className='max-w-[200px] my-auto font-poppins'>
        <h3 className='text-center font-medium pb-3'>Add a new workout!</h3>
        <label className=''>Exercise Title:</label>
        <div className='items-center justify-center'>
          <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} required className='border' />
        </div>
        <label>Weight(in kg):</label>
        <input type='number' onChange={(e) => setWeight(e.target.value)} value={weight} className='border' />
        <label>Sets:</label>
        <input type='number' onChange={(e) => setSets(e.target.value)} value={sets} className='border' />
        <label>Reps:</label>
        <input type='number' onChange={(e) => setReps(e.target.value)} value={reps} className='border' />
        <div className='text-center'>
          <button className='bg-[#F8F4F9] font-poppins shadow-md text-red p-2 mt-5 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9]'>Submit</button>
        </div>

        {error && <div className=''>{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
