import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [showSignup, setSignup] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeSignup = () => {
    setSignup(false);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0]
      }));
      return;
    }

    if (name === "password") {
      const regex = /^[A-Za-z0-9]*$/;
      setIsPasswordValid(regex.test(value));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    isPasswordValid;

  return (
    <div>
      {showSignup && (
        <div
          className="flex justify-center items-center fixed inset-0 bg-amber-50 w-full h-screen bg-contain bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded text-black focus:ring-2 focus:outline-none mb-2 ${isPasswordValid
                ? "bg-gray-100 focus:ring-blue-400"
                : "bg-red-100 border border-red-500 focus:ring-red-500"
                }`}
            />

            {!isPasswordValid && (
              <p className="text-red-500 text-sm mb-2">
                ❌ Invalid password — please use only letters and numbers.
              </p>
            )}

            {/* Image Upload */}
            <div className="w-full mb-4">
              <label className="w-full block px-4 py-2 rounded bg-gray-100 text-black cursor-pointer  hover:bg-gray-200 transition">
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Signup Button */}
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-full transition duration-200 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                if (!isFormValid) return;

                console.log(formData);

                alert(`Welcome ${formData.name}! 🎉 Your journey at TrendyThreads starts here.`);
                navigate('/Home');
              }}
              disabled={!isFormValid}
            >
              Sign Up
            </button>

            {/* Already Registered */}
            <p className="text-center mt-4 text-sm text-gray-700">
              Already registered?
              <span
                className="ml-2 text-blue-500 hover:underline cursor-pointer font-medium"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPage;