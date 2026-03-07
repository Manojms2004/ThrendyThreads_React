import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [showSignup, setSignup] = useState(true);
  const navigate = useNavigate();

  const [showName, setName] = useState('');
  const [showEmail, setEmail] = useState('');
  const [showPassword, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeSignup = () => {
    setSignup(false);
    navigate('/');
  };

  // Validation handler for password input
  const validatePassword = (value) => {
    // --- OPTION A: only letters + numbers (no symbols)
    const regex = /^[A-Za-z0-9]*$/;

    // --- OPTION B: allow symbols but enforce minimal strength (uncomment below and comment above)
    // const regex = /(?=.{6,})(?=.*[A-Za-z])(?=.*\d).*/; // example: min 6, at least one letter & one number

    setIsPasswordValid(regex.test(value));
    setPassword(value);
  };

  const isFormValid =
    showName.trim() !== '' &&
    showEmail.trim() !== '' &&
    showPassword.trim() !== '' &&
    isPasswordValid;

  return (
    <div>
      {showSignup && (
        <div
          className="flex justify-center items-center fixed inset-0 bg-amber-50 w-full h-screen bg-contain bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="p-8 rounded-lg shadow-lg bg-white bg-opacity-80 relative max-w-md w-full">
            <button
              onClick={closeSignup}
              className="absolute top-2 right-2 text-2xl mr-4 hover:text-blue-600"
            >
              X
            </button>

            <div className="flex justify-center mb-6">
              <p><b className="text-2xl">Signup</b></p>
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              value={showName}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
              aria-label="Name"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={showEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
              aria-label="Email"
            />

            {/* Password with validation */}
            <input
              type="password"
              placeholder="Password"
              value={showPassword}
              onChange={(e) => validatePassword(e.target.value)}
              className={`w-full px-4 py-2 rounded text-black focus:ring-2 focus:outline-none mb-2 ${
                isPasswordValid
                  ? 'bg-gray-100 focus:ring-blue-400'
                  : 'bg-red-100 border border-red-500 focus:ring-red-500'
              }`}
              aria-label="Password"
            />
            {!isPasswordValid && (
              <p className="text-red-500 text-sm mb-2">
                ❌ Invalid password — please use only letters and numbers.
              </p>
            )}

            {/* Signup button (disabled when form invalid) */}
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-full transition duration-200 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                if (!isFormValid) return;
                alert(`Welcome ${showName}! 🎉 Your journey at TrendyThreads starts here.`);
                navigate('/Home');
              }}
              disabled={!isFormValid}
            >
              Sign Up
            </button>

            {/* Forgot Password */}
            <p
              className="text-center mt-4 text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Forgot Password
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
