import React from "react";
import { useAuthContext } from "./useAuthContext";
import { useSignup } from "./useSignup";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { setAccessToken } = useSignup();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    
    setAccessToken(null);

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    // remove the refresh token from the httponly cookie
    // Deleting access_token cookie with implicit domain.
    // document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return { logout };
};

export default useLogout;
