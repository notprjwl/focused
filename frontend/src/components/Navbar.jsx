import React from "react";
import { Link } from "react-router-dom";
import Main from "../pages/Main";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };


  return (
    <header className='bg-background text-text'>
      <div className='container font-dm max-w-[1400px] mx-auto my-0 flex items-center p-3 pt-2 justify-between'>
        <div className='flex group'>
          <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='dumbbell' className='svg-inline--fa fa-dumbbell fa-lg w-8 sm:w-5 mb-0.5  group-hover:text-[#81837e] transition-all duration-500 ease-in-out' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
            <path fill='currentColor' d='M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z' />
          </svg>
          <Link to='/'>
            <h1 className='text-2xl sm:text-[1rem] sm:font-semibold pl-2 sm:pl-1 font-pt tracking-tighter group-hover:text-[#81837e] transition-all duration-500 ease-in-out'>focused.</h1>
          </Link>
        </div>
        <div className='flex text-center font-bold items-center tracking-tight'>
          {/* <Link className='pr-5'>
            <h1>Main</h1>
          </Link>
          <Link className='pr-2'>
            <h1>Charts</h1>
          </Link> */}

          {/* <Link to='/workouts' className='animate-none hover:animate-spin transition ease-in-out'>
              <svg className='h-6 w-6 text-text' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10' /> <line x1='12' y1='8' x2='12' y2='16' /> <line x1='8' y1='12' x2='16' y2='12' />
              </svg>
            </Link> */}
          {/* {user && (
            <div className='dropdown dropdown-end dropdown-hover'>
              <div tabIndex={0} role='' className=' text-1xl sm:text-[1rem] text-text'>
                {user.username}
              </div>
              <ul tabIndex={0} className='dropdown-content z-[1] menu shadow bg-formBg mt-2 rounded-md w-25'>
              <Link to='/dashboard'>
                  <li className=''>
                    <a className='p-1 rounded-sm hover:bg-black'>Dashboard</a>
                  </li>
                </Link>
                <Link to='/workouts'>
                  <li className=''>
                    <a className='p-1 rounded-sm hover:bg-black'>Workouts</a>
                  </li>
                </Link>
                <li onClick={handleLogout} className=''>
                  <a className='p-1 rounded-sm hover:bg-black'>Logout</a>
                </li>
              </ul>
            </div>
          )} */}
          {user && (<li class='group relative dropdown px-2 text-1xl sm:text-[1rem] text-text tracking-tight'>
            <a>
              {user.username}
            </a>
            <div class='group-hover:block dropdown-menu absolute hidden right-0'>
            <ul className='z-[1] menu shadow bg-formBg mt-2 rounded-md w-25 p-0'>
                <Link to='/dashboard'>
                  <li className=''>
                    <a className='p-2 rounded-sm hover:bg-black'>Dashboard</a>
                  </li>
                </Link>
                <Link to='/workouts'>
                  <li className=''>
                    <a className='p-2 rounded-sm hover:bg-black'>Workouts</a>
                  </li>
                </Link>
                <li onClick={handleLogout} className=''>
                  <a className='p-2 rounded-sm hover:bg-black'>Logout</a>
                </li>
              </ul>
            </div>
          </li> )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
