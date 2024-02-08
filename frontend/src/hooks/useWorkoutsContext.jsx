import React, { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  
  if (!context) {
    throw Error("useWorkoutContext must be used inside an WorkoutsContextProvider");
  }
  return context;
};

export { useWorkoutsContext };
