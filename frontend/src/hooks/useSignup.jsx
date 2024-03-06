import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext  } from "./useAuthContext";
import SignUp from "../pages/SignUp";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = process.env.SERVER_API;

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`https://focused-server.vercel.app/api/user/signup`, {
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
      // localStorage.setItem("user", JSON.stringify(json));
      const { token, refreshToken } = json;
      setAccessToken(token)
      // document.cookie = `refreshToken=${refreshToken}; path=/; samesite=strict; httponly`;
      dispatch({ type: "SIGNUP", payload: json });
      setIsLoading(false);
      setEmptyFields([]);
      navigate('/login')
    }
  };

  return { signup, error, isloading, emptyFields, accessToken, setAccessToken };
};

export { useSignup };
