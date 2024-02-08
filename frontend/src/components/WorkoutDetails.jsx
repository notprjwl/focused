import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const newCreatedAt = workout.createdAt.slice(0, 10);
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className='text-back font-poppins p-6 shadow-lg mb-9 max-w-[1400px] rounded-lg'>
      <h4 className='font-bold text-red mb-3'>{workout.title}</h4>
      <p>
        <strong>Weight(kg): </strong>
        {workout.weight}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Created At: </strong>
        {newCreatedAt}
      </p>
      <span className='flex justify-end'>
        <button className='absolute mt-[-130px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9]'>Update</button>
      </span>
      <span className='flex justify-end'>
        <button className='absolute mt-[-40px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9]' onClick={handleClick}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default WorkoutDetails;
