import React from "react";
import {useState, useEffect} from "react"

const useFetch = (url) => {
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw Error("error: cannot fetch the data");
        }
        const respData = await resp.json();
        setTimeout(() => {
          setWorkouts(respData);
          setLoading(false);
          setError(null);
        }, 1000);
      } catch (error) {
        setLoading(false);
        setWorkouts(null);
        setError(error.message);
      }
    };
    fetchWorkouts();
  }, [url]);

  return { workouts, loading, error };
};

export default useFetch;
