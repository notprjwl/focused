import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='bg-background font-jost text-text text-inter '>
      <div className='container font-dm max-w-[1400px] mx-auto my-0 flex items-center p-3 justify-between'>
        <div className='flex '>
          <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='dumbbell' className='svg-inline--fa fa-dumbbell fa-lg w-8' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
            <path fill='currentColor' d='M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z' />
          </svg>
          <Link to='/api/workouts'>
            <h1 className='text-2xl pl-2 font-bold italic tracking-tight'>Workout.</h1>
          </Link>
        </div>

        <div className='flex text-center font-bold items-center tracking-tight'>
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
