import React, { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext(); // creating context

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload,  actionType: "LOGIN" };

    case "SIGNUP":
      return { user: action.payload, actionType: "SIGNUP"};

    case "LOGOUT":
      return { user: null, actionType: null };

    default:
      return state;
  }
};

// 
const user = JSON.parse(localStorage.getItem('user')) || null

const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, {
    user: user, // initially state is null
  });


  console.log("Auth context state: ", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, authReducer, AuthContextProvider };
