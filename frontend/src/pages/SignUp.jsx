import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [transition, setTransition] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading, emptyFields } = useSignup();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <body className='mx-5'>
      <div className={`flex justify-center h-[90vh] items-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <div className={`bg-formBg p-5 mx-auto w-[23rem] h-[29rem] transition-all duration-400 ease-in-out transform ${error ? 'h-[31rem]' : 'h-[29rem]'} shadow-xl rounded-xl`}>
          <div className='font-sans text-white text-center mb-7'>
            <h1 className='font-sans font-bold text-[20px]'>Create your account</h1>
            <span className='font-sans text-[16px]'>to continue</span>
          </div>
          <form action='' className='' onSubmit={handleSubmit}>
            <div className='p-2'>
              <label htmlFor='email' className='block font-sans font-medium text-sm text-white mb-1'>
                Username
              </label>
              <input type='text' className={`text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus ${error && typeof error === "string" && (error.includes("username already in use") || emptyFields?.includes("username")) ? "border-errorField" : ""}`} value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='p-2'>
              <label htmlFor='email' className='block font-sans font-medium text-sm text-white mb-1'>
                Email address
              </label>
              <input type='email' className={`text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus ${error && typeof error === "string" && (error.includes("email already in use") || emptyFields?.includes("email")) ? "border-errorField" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='p-2'>
              <label htmlFor='email' className='block font-sans font-medium text-sm text-white mb-1'>
                Password
              </label>
              <input type='password' className={`text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus ${error && typeof error === "string" && (error.includes("Password not strong enough") || emptyFields?.includes("password")) ? "border-errorField" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='p-2 pt-5'>
              <button type='submit' disabled={isLoading} className='text-white text-sm font-semibold  bg-borderFocus border border-none rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus hover:bg-green-800 transition-all duration-500 ease-in-out'>
                CONTINUE
              </button>
            </div>
            <div className='flex gap-1 p-2 text-sm font-sans text-white'>
              <p>Have an account? </p>
              <Link to='/login' className='transition-all duration-500 ease-in-out hover:bg-text hover:rounded-md hover:px-2'>
                Login
              </Link>
            </div>
          </form>
          <div>{error && <div className='text-error mx-2 '>{error}</div>}</div>
        </div>
      </div>
    </body>
  );
};

export default SignUp;
