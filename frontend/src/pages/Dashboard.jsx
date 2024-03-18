import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutForm from "../components/WorkoutForm";

const Dashboard = () => {
  const [transition, setTransition] = useState(false);
  const [isAddWorkoutHovered, setIsAddWorkoutHovered] = useState(false);
  const [quote, setQuote] = useState("");
  const { user } = useAuthContext();
  const Quote = require("inspirational-quotes");
  const [modal, setModal] = useState(false);

  const getQuotes = () => {
    const quotes = Quote.getRandomQuote({ author: false });
    if (quotes.length > 80) {
      const gymQuotes = ["Train insane or remain the same.", "Your only limit is you.", "Sweat, smile, repeat.", "Wake up, work out, kick ass.", "Push yourself, because no one else is going to do it for you.", "Fitness is not about being better than someone else; it's about being better than you used to be.", "Strive for progress, not perfection.", "Your body can withstand almost anything; it's your mind you have to convince.", "Fitness is not a destination; it is a way of life.", "The only bad workout is the one that didn't happen.", "Make your sweat your best accessory.", "Stronger than yesterday, weaker than tomorrow.", "Your health is an investment, not an expense.", "It's not about having time; it's about making time.", "The only way to do great work is to love what you do.", "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "The difference between try and triumph is a little umph.", "Your body hears everything your mind says. Stay positive.", "Don't stop when you're tired; stop when you're done.", "Success starts with self-discipline."];
      return gymQuotes[Math.floor(Math.random() * gymQuotes.length)];
    } else {
      return quotes;
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTransition(true);
    }, 100);
    setQuote(getQuotes());
    return () => clearTimeout(timeOut);
  }, []);

  const modalOpen = () => {
    setModal(true);
  };
  const modalClose = () => {
    setModal(false);
  };

  return (
    <div className=''>
      <div className={`justify-center items-center text-center transition-all duration-1000 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        <div className='mt-[5rem] font-playfair text-2xl text-[#d0d0cf] italic mx-2 sm:text-[1.2rem] sm:mt-[6rem] text shadow-white ' style={{ textShadow: "1px 1px 4px rgba(255, 255, 255, 0.8)" }}>
          "{quote}"
        </div>

        <div class='w-80 relative mx-auto mt-[3rem] items-center justify-center text-center group sm:text-[1.3rem]'>
          <h1 className={`text-white font-playfair text-4xl blur-[1px] group-hover:blur-0 transition-all duration-500 ease-in-out ${isAddWorkoutHovered ? "blur-none" : "blur-[1px]"} sm:text-[1.6rem]`}>
            Are you focu<span className={`'opacity-80 blur-[1px] group-hover:blur-none group-hover:opacity-100 transition-all duration-500 ease-in-out italic' ${isAddWorkoutHovered ? "blur-none italic" : "blur-[1px] italic opacity-90"}`}>sed,</span> <h1 className={`'opacity-40 absolute mx-auto sm:top-7 sm:bottom-[0.1rem] left-0 right-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:blur-none group-hover: font-semibold text-md'${isAddWorkoutHovered ? "blur-none font-semibold" : "blur-[1px] opacity-20"}`}>{user.username}?</h1>
          </h1>
        </div>
        <div className={`justify-center items-center mt-20 flex gap-5 mx-5 sm:flex-col sm:items-center sm:justify-center transition-all duration-500 ease-in-out transform ${transition ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className='h-[20rem] w-[15rem] flex flex-col items-center justify-center bg-text rounded-xl cursor-pointer blur-[1px] hover:blur-0 sm:h-[10rem]' onMouseEnter={() => setIsAddWorkoutHovered(true)} onMouseLeave={() => setIsAddWorkoutHovered(false)} onClick={modalOpen}>
            {/* <img src='/dashboard-2.jpg' alt='da' className='h-full w-full object-cover sm:items-center sm:mx-auto rounded-xl blur-sm' /> */}
            <h1 className='text-background font-poppins font-semibold'>Add workout</h1>
          </div>
          <Link to='/workouts'>
          <div className='h-[20rem] w-[15rem] flex flex-col items-center justify-center bg-text rounded-xl cursor-pointer blur-[1px] hover:blur-0 sm:h-[10rem]' onMouseEnter={() => setIsAddWorkoutHovered(true)} onMouseLeave={() => setIsAddWorkoutHovered(false)}>
            {/* <img src='/dashboard-2.jpg' alt='da' className='h-full w-full object-cover sm:items-center sm:mx-auto rounded-xl blur-sm' /> */}
            <h1 className='text-background font-poppins font-semibold'>Your Workouts</h1>
          </div>
          </Link>
        </div>
      </div>
      {modal && <WorkoutForm closeModal={modalClose} />}
    </div>
  );
};

export default Dashboard;
