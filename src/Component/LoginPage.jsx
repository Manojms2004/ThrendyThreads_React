import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSquareInstagram, FaTwitter, FaFacebook } from "react-icons/fa6";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [showLogin, setLogin] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const closeLogin = () => {
    setLogin(false);
    navigate("/");
  };

  // Password validation
  const validatePassword = (value) => {
    const regex = /^[A-Za-z0-9]*$/;
    setIsPasswordValid(regex.test(value));
    setPassword(value);
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    isPasswordValid;

  const handleLogin = async () => {
    if (!isFormValid) return;

    try {
      const payload = {
        email: email,
        password: password
      };

      const response = await axios.post(
        "https://localhost:44332/api/Login/Login",
        payload
      );

      if (response.data) {
        toast.success("Login Successful");

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      {showLogin && (
        <div
          className="flex justify-center items-center fixed inset-0 bg-amber-50 w-full h-screen bg-contain bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="p-8 rounded-lg shadow-lg bg-white bg-opacity-80 relative">

            <button
              onClick={closeLogin}
              className="absolute top-2 right-2 text-2xl mr-4 hover:text-black cursor-pointer"
              aria-label="Close Login"
            >
              X
            </button>

            <div>
              <p className="text-2xl mb-4 text-center">
                <b>Login</b>
              </p>

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-100 text-black focus:ring-2 focus:outline-none mb-4 focus:ring-blue-400"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                className={`w-full px-4 py-2 rounded text-black focus:ring-2 focus:outline-none mb-2 ${
                  isPasswordValid
                    ? "bg-gray-100 focus:ring-blue-400"
                    : "bg-red-100 border border-red-500 focus:ring-red-500"
                }`}
              />

              {!isPasswordValid && (
                <p className="text-red-500 text-sm mb-2">
                 Password should not contain symbols.
                </p>
              )}

              {/* Login Button */}
              <button
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 cursor-pointer"
                disabled={!isFormValid}
                onClick={handleLogin}
              >
                Login
              </button>

              {/* Signup Redirect */}
              <div className="mt-4 text-sm text-black text-center">
                <span>New to TrendyThreads? </span>
                <span
                  className="text-black hover:underline cursor-pointer font-medium"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 text-4xl mt-8 justify-center">
                <FaSquareInstagram className="cursor-pointer transform transition duration-300 hover:scale-110" />
                <FaTwitter className="cursor-pointer transform transition duration-300 hover:scale-110" />
                <FaFacebook className="cursor-pointer transform transition duration-300 hover:scale-110" />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;