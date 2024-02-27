import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import SignUp from "../pages/SignUp";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [emptyFields, setEmptyFields] = useState([])

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      // saving the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setEmptyFields([]);
    }
  };

  return { signup, error, isloading, emptyFields };
};

export { useSignup };
