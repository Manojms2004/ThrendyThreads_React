import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaSquareInstagram, FaTwitter, FaFacebook } from "react-icons/fa6"; 

function LoginPage() {
  const [showLogin, setLogin] = useState(true);
  const navigate = useNavigate(); 
  const [showUsername, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeLogin = () => {
    setLogin(false);
    navigate('/');
  };

  // Validation: no symbols allowed
  const validatePassword = (value) => {
    const regex = /^[A-Za-z0-9]*$/; // only letters + numbers
    setIsPasswordValid(regex.test(value)); 
    setPassword(value);
  };

  const isFormValid = 
    showUsername.trim() !== '' && 
    Password.trim() !== '' && 
    isPasswordValid;

  return (
    <div>
      {showLogin && (
        <div 
          className='flex justify-center items-center fixed inset-0 bg-amber-50 w-full h-screen bg-contain bg-no-repeat' 
          style={{ 
            backgroundImage: "url(https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg)", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat' 
          }} 
        >
          <div className='p-8 rounded-lg shadow-lg bg-white bg-opacity-80 relative'>
            <button 
              onClick={closeLogin} 
              className="absolute top-2 right-2 text-2xl mr-4 hover:text-blue-600" 
              aria-label="Close Login"> X
            </button>
            <div>
              <p className='text-2xl mb-4 text-center'><b>Login</b></p>
              
              {/* Username */}
              <input
                type='text'
                placeholder='Username'
                value={showUsername}
                onChange={(e)=>setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
              />
              
              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e)=>validatePassword(e.target.value)}
                className={`w-full px-4 py-2 rounded text-black focus:ring-2 focus:outline-none mb-2 ${
                  isPasswordValid 
                    ? "bg-gray-100 focus:ring-blue-400" 
                    : "bg-red-100 border border-red-500 focus:ring-red-500"
                }`}
              />
              {!isPasswordValid && (
                <p className="text-red-500 text-sm mb-2">
                  ❌ Password should not contain symbols.
                </p>
              )}

              {/* Login Button */}
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded disabled:opacity-50 cursor-pointer" 
                disabled={!isFormValid}
                onClick={()=>{
                   alert("Welcome 🎉 Your journey at TrendyThreads starts here.");
                  navigate('/Home')
                }} 
              > 
                Login 
              </button>

              {/* Forgot Password */}
              <div className="mt-4 text-sm text-black text-center">
                <span 
                  className="hover:underline cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Forgot password?
                </span>
              </div>

              {/* Social Icons */}
              <div className='flex gap-4 text-4xl mt-8 justify-center'>
                <FaSquareInstagram className="cursor-pointer transform transition duration-300 hover:scale-110" />
                <FaTwitter className="cursor-pointer transform transition duration-300 hover:scale-110"/>
                <FaFacebook className="cursor-pointer transform transition duration-300 hover:scale-110"/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
