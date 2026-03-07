import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mainpage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] relative overflow-hidden">
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

      <div className="flex flex-col items-center justify-center min-h-screen">

        <div className="text-center mb-10">
          <p className="text-5xl font-bold">
            TrendyThreads
            Wear Your Style with Confidence
          </p>
        </div>

        <div className="flex space-x-10 mb-20">
          <button
            type="button"
            className="px-10 py-2 text-2xl cursor-pointer font-semibold text-black border-2 border-black rounded-xl bg-transparent backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>

          <button
            type="button"
            className="px-10 py-2 text-2xl cursor-pointer font-semibold text-black border-2 border-black rounded-xl bg-transparent backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Signup
          </button>
        </div>

      </div>
    </div>
  );
}

export default Mainpage;
