import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const [showSignup, setSignup] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    image: null
  });

  const [imageName, setImageName] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeSignup = () => {
    setSignup(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      if (file) {
        setImageName(file.name);

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];

          setFormData((prev) => ({
            ...prev,
            image: base64String
          }));
        };

        reader.readAsDataURL(file);
      }

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

  const handleSignup = async () => {
    if (!isFormValid) return;

    try {
      const payload = {
        userName: formData.name,
        password: formData.password,
        email: formData.email,
        image: formData.image
      };

      await axios.post(
        "https://localhost:44332/api/Registration/RegisterUser",
        payload
      );

      toast.success("Registered successfully");

      setTimeout(() => {
        navigate("/Home");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      {showSignup && (
        <div
          className="flex justify-center items-center fixed inset-0 bg-amber-50 w-full h-screen bg-contain bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="p-8 rounded-lg shadow-lg bg-white bg-opacity-80 relative max-w-md w-full">

            <button
              onClick={closeSignup}
              className="absolute top-2 right-2 text-2xl mr-4 hover:text-black cursor-pointer"
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
              className={`w-full px-4 py-2 rounded text-black focus:ring-2 focus:outline-none mb-2 ${
                isPasswordValid
                  ? "bg-gray-100 focus:ring-blue-400"
                  : "bg-red-100 border border-red-500 focus:ring-red-500"
              }`}
            />

            {!isPasswordValid && (
              <p className="text-red-500 text-sm mb-2">
                please use only letters and numbers.
              </p>
            )}

            {/* Image Upload */}
            <div className="w-full mb-4">
              <label className="w-full block px-4 py-2 rounded bg-gray-100 text-black cursor-pointer hover:bg-gray-200 transition">
                {imageName ? imageName : "Upload Image"}
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
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 cursor-pointer"
              onClick={handleSignup}
              disabled={!isFormValid}
            >
              Sign Up
            </button>

            <p className="text-center mt-4 text-sm text-gray-700">
              Already registered?
              <span
                className="ml-2 text-black hover:underline cursor-pointer font-medium"
                onClick={() => navigate("/login")}
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