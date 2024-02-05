import React, { useState } from "react";
// import useFetch from "../hooks/useFetch";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  // const { fetchData } = useFetch("/api/workouts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, weight, reps };
    const resp = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await resp.json();
    if (!resp.ok) {
      setError(json.error); //error prop in workoutcontroller
    }
    if (resp.ok) {
      setTitle("");
      setWeight("");
      setReps(""); // why because when you submit the content in the input field will get deleted
      setError(null);
      console.log("new workout added:", json);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=' max-w-[200px] my-auto'>
      <h3>Add a new workout!</h3>
      <label>Exercise Title</label>
      <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} required className='border' />
      <label>Weight(in kg):</label>
      <input type='number' onChange={(e) => setWeight(e.target.value)} value={weight}  className='border' />
      <label>Reps:</label>
      <input type='number' onChange={(e) => setReps(e.target.value)} value={reps}  className='border' />
      <button className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>
        Submit
      </button>
      {error && <div className=''>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
