import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Login from "../pages/Login";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    const json = await response.json();
    console.log("json response: ", json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      // saving the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      const { token, refreshToken } = json;
      setAccessToken(token);
      // document.cookie = `refreshToken=${refreshToken}; path=/; samesite=strict; httponly`;
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setEmptyFields([]);
    }
  };

  return { login, error, isloading, emptyFields, accessToken, setAccessToken };
};

export { useLogin };
