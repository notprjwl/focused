import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const [transition, setTransition] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    return () => clearTimeout(timeOut);
  });

  return (
    <div className={`justify-center items-center text-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
      <div class='w-80 relative mx-auto mt-[7rem] items-center justify-center text-center'>
        <div className=''>
          <h1 className='text-white font-playfair text-4xl group blur-[1px] hover:blur-0 transition-all duration-500 ease-in-out'>
            Are you focu<span className='opacity-80 blur-[1px] group-hover:blur-none group-hover:opacity-100 transition-all duration-500 ease-in-out italic'>sed,</span> <h1 className='opacity-40 absolute mx-auto left-0 right-0 group-hover:opacity-100 transition-all duration-500 ease-in-out blur-[1px] group-hover:blur-none group-hover: font-semibold text-md'>{user.username}?</h1>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
