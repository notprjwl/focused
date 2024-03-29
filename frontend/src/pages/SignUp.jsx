import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [transition, setTransition] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading, emptyFields } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate()

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
      <div className={`flex justify-center h-[90vh] sm:h-[70vh] items-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
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
              <label htmlFor='password' className='block font-sans font-medium text-sm text-white mb-1'>
                Password
              </label>
              <div className='relative'>
              <input type={showPassword ? "text" : "password"} className={`text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus ${error && typeof error === "string" && (error.includes("Password not strong enough") || emptyFields?.includes("password")) ? "border-errorField" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer transition-all duration-500 ease-in-out' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4 transition-all duration-500 ease-in-out'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88' />
                    </svg>
                  ) : (
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4 transition-all duration-500 ease-in-out'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                    </svg>
                  )}
                </div>
              </div>
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


