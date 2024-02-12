import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const UpdateModal = ({ closeModal, initialValues }) => {
    const [updatedTitle, setUpdatedTitle] = useState(initialValues.title);
    const [updatedWeight, setUpdatedWeight] = useState(initialValues.weight);
    const [updatedSets, setUpdatedSets] = useState(initialValues.sets);
    const [updatedReps, setUpdatedReps] = useState(initialValues.reps);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useWorkoutsContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedWorkout = {
            title: updatedTitle,
            weight: updatedWeight,
            sets: updatedSets,
            reps: updatedReps,
        };
        console.log('updatedWorkout:', updatedWorkout)
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
        <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Update Workout</h2>
                <form onSubmit={handleSubmit}>
                    <label className='block mb-2'>
                        Title:
                        <input type='text' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} name='title' className='border p-2 w-full' />
                    </label>
                    <label className='block mb-2'>
                        Weight(kg):
                        <input type='number' value={updatedWeight} onChange={(e) => setUpdatedWeight(e.target.value)} name='weight' className='border p-2 w-full' />
                    </label>
                    <label className='block mb-2'>
                        Sets:
                        <input type='number' value={updatedSets} onChange={(e) => setUpdatedSets(e.target.value)} name='sets' className='border p-2 w-full' />
                    </label>
                    <label className='block mb-2'>
                        Reps:
                        <input type='number' value={updatedReps} onChange={(e) => setUpdatedReps(e.target.value)} name='reps' className='border p-2 w-full' />
                    </label>
                    <div className='flex justify-between mt-5'>
                        <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-dark'>
                            Update
                        </button>
                        <button type='button' onClick={handleClose} className='bg-red text-white py-2 px-4 rounded-md hover:bg-red-dark'>
                            Close
                        </button>
                    </div>
                    <div className='flex items-center justify-center text-center mt-2'>{error && <span className='bg-error p-2 rounded-lg text-white'>{error}</span>}</div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
