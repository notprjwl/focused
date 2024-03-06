import React from "react";
import { useState, useEffect } from "react";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { useAuthContext } from "./useAuthContext";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { workouts, dispatch } = useWorkoutsContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const resp = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!resp.ok) {
          throw Error("error: cannot fetch the data");
        }
        const json = await resp.json();
        setTimeout(() => {
          dispatch({ type: "SET_WORKOUTS", payload: json });
          setLoading(false);
          setError(null);
        }, 1000);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [url, user]);

  return { workouts, loading, error };
};

export default useFetch;
