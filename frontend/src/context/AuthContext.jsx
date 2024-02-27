import React, { createContext, useReducer } from "react";

const AuthContext = createContext();	// creating context

const authReducer = (state, action) => {	
  switch (action.type) {
    case "LOGIN":			
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,	// initially state is null
  });
  console.log("Auth context state: ", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export {AuthContext, authReducer, AuthContextProvider}