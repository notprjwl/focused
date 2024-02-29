import React from "react";
import { useAuthContext } from "./useAuthContext";
import { useSignup } from "./useSignup";

const useLogout = (req, res) => {
  const { dispatch } = useAuthContext();
  const { setAccessToken } = useSignup();
  const logout = () => {
    console.log("Application log before logout:", document.cookie);

    // // remove user from storage
    // localStorage.removeItem("user");
    setAccessToken(null);
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    // remove the refresh token from the httponly cookie
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=`;

  };
  // Forcefully update the application log
  setTimeout(() => {
    console.log("Application log after logout:", document.cookie);
  }, 0);

  return { logout };
};

export default useLogout;
