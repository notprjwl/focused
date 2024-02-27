import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [transition, setTransition] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail = usernameOrEmail.includes("@");
    const result = isEmail ? handleEmailSubmit(usernameOrEmail) : handleUsernameSubmit(usernameOrEmail);
  };

  const handleEmailSubmit = async (email) => {
    console.log("email:", usernameOrEmail);
  };

  const handleUsernameSubmit = async (username) => {
    console.log("username: ", usernameOrEmail);
  };

  return (
    <body className="mx-5">
      <div className={`flex justify-center h-[90ch] items-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <div className='bg-formBg p-5 mx-auto w-[23rem] h-[50%] shadow-xl rounded-xl'>
          <div className='font-sans text-white text-center mb-7'>
            <h1 className='font-sans font-bold text-[20px]'>Login to your account</h1>
            <span className='font-sans text-[16px]'>to continue</span>
          </div>
          <form className='' onSubmit={handleSubmit}>
            <div className='p-2'>
              <label htmlFor='email' className='block font-sans font-medium text-sm text-white mb-1'>
                Username or Email address
              </label>
              <input type='text' className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
            </div>
            <div className='p-2'>
              <label htmlFor='email' className='block font-sans font-medium text-sm text-white mb-1'>
                Password
              </label>
              <input type='password' className='text-white text-sm  bg-formBg border border-border rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='p-2 pt-5'>
              <button type='submit' className='text-white text-sm font-semibold bg-borderFocus border border-none rounded-md w-full px-[16px] py-[10px] focus:border-transparent focus:outline-none focus:ring-1 focus:ring-borderFocus hover:bg-green-800 transition-all duration-500 ease-in-out'>
                CONTINUE
              </button>
            </div>
            <div className='flex gap-1 p-2 text-sm font-sans text-white'>
              <p>Don't have an account? </p>
              <Link to='/signup' className='transition-all duration-500 ease-in-out hover:bg-text hover:rounded-md hover:px-2'>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Login;
