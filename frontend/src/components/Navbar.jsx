import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='bg-white '>
      <div className='container font-crete max-w-[1400px] mx-auto my-0 flex items-center p-3 justify-between'>
        <Link to='/'>
          <h1 className=' font-bold text-1xl'>Workout Tracker</h1>
        </Link>
        <div className='flex text-center items-center'>
          <Link className='pr-5'>
            <h1>Home</h1>
          </Link>
          <Link className='pr-2'>
            <h1>Charts</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
