import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mainpage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative">
      <video autoPlay muted loop className="absolute w-full h-full object-cover z-[-1] inset-0"
      >
        <source
          src="https://videos.pexels.com/video-files/8386982/8386982-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="flex ">
        <p className=" p-2 text-4xl">
          <b>TrendyThreads</b>
        </p>
      </div>

      <div className="flex space-x-4 justify-center mt-80">
        <button
          type="button"
          className="px-10 py-2 bg-transparent border-3 border-black text-2xl text-black rounded-md hover:bg-white hover:text-black transition cursor-pointer"
          onClick={() =>{
            
           navigate('/login');}} > Login </button>
        <button type="button" className="px-10 py-2 bg-transparent border-3 border-black text-2xl text-black rounded-md hover:bg-white hover:text-black transition cursor-pointer"
          onClick={() => {
           
            navigate('/signup');}}>Signup </button>
      </div>
    </div>
  );
}

export default Mainpage;
