import React from "react";

const WorkoutDetails = ({ workout }) => {
  const newCreatedAt = workout.createdAt.slice(0, 10)
  return (
    <div className='text-back font-poppins pb-4'>
      <h4 className='font-bold'>{workout.title}</h4>
      <p>
        <strong>Weight(kg): </strong>
        {workout.weight}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Created At: </strong>
        {newCreatedAt}
      </p>
    </div>
  );
};

export default WorkoutDetails;
