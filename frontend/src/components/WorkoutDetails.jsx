import React from "react";

const WorkoutDetails = ({ workout }) => {
  const newCreatedAt = workout.createdAt.slice(0, 10)
  return (
    <div className='text-back font-poppins p-6 shadow-lg mb-9 w-[250px] rounded-lg justify-start mr-auto'>
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
    </div>
  );
};

export default WorkoutDetails;
