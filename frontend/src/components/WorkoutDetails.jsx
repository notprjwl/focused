import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import UpdateModal from "./UpdateModal";

const WorkoutDetails = ({ workout }) => {
  const newCreatedAt = workout.createdAt.slice(0, 10);
  const { dispatch } = useWorkoutsContext();

  const [modal, setModal] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
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

  return (
    <div className='text-back font-poppins p-6 shadow-lg mb-9 max-w-[1400px] rounded-lg '>
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
        <button className='absolute mt-[-130px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9] transition-all duration-500 ease-in-out' onClick={ismodalOpen}>
          Update
        </button>
      </span>
      <span className='flex justify-end'>
        <button className='absolute mt-[-40px] bg-[#F8F4F9] font-poppins shadow-md text-red p-2 rounded-md text-sm font-bold hover:bg-red hover:text-[#F8F4F9]' onClick={handleDelete}>
          Delete
        </button>
      </span>
      {modal && (
        <UpdateModal
          closeModal={isModalClose}
          initialValues={{
            title: workout.title,
            weight: workout.weight,
            sets: workout.sets,
            reps: workout.reps,
            _id: workout._id
          }}
        />
      )}
    </div>
  );
};

export default WorkoutDetails;
