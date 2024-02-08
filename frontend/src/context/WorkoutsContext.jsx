import React, { createContext, useReducer } from "react";

const WorkoutsContext = createContext(); // creating context
const workoutsReducer = (state, action) => {
  switch (
    action.type // action.type is a property of the action object that describes the type or category of the action being performed.
  ) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], //updating the state by creating a new array that includes the action.payload (new workout) followed by the existing workouts in the state (...state.workouts).
      };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id), // here we are filter if the workout id is equal to the deleted id that i.e payload which is json then don't display. if it is not equal then display.
      };

    default:
      return state; // return the current state unchanged
  }
};

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return <WorkoutsContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutsContext.Provider>;
};

export { WorkoutsContext, workoutsReducer, WorkoutContextProvider };
