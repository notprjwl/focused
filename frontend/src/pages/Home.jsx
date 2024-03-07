import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  });

  return (
    <div className={`justify-center items-center text-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
      <div class='w-80 relative mx-auto mt-[4rem] items-center justify-center text-center'>
        <div className="">
          <h1 className='text-white font-playfair text-4xl group blur-[1px] hover:blur-0 transition-all duration-500 ease-in-out'>
            Are you focu<span className='opacity-80 blur-[1px] group-hover:blur-none group-hover:opacity-100 transition-all duration-500 ease-in-out italic'>sed,</span> <h1 className='opacity-0 absolute mx-auto left-0 right-0 group-hover:opacity-100 transition-all duration-500 ease-in-out blur-[1px] group-hover:blur-none group-hover: font-semibold text-md'>Prajwal?</h1>
          </h1>
        </div>
        <img src='/home-illustration.png' alt='Home Illustration' className='w-full h-full object-cover sm:items-center sm:mx-auto sm:w-[80%]' />
        <div class='absolute bottom-0 left-0 right-0 h-10 gradient'></div>
      </div>
      <div className='items-center flex flex-wrap justify-center mt-10 gap-4  font-jost '>
        <Link to='/login'>
          <button type='button' className='text-text font-jost text-1xl hover:text-[#e4e7eb] border border-[#3a645d86] hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-[#3a645d] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-in-out duration-500'>
            Login
          </button>
        </Link>
        <Link to='/signup'>
          <button type='button' className='text-text hover:text-[#202020] border border-[#e4e7eb33] hover:bg-[#e4e7ebe0] focus:ring-1 focus:outline-none focus:ring-[#3a645d] font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 transition-all ease-in-out duration-500'>
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
