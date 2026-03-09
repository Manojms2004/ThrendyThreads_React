import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaStar, FaRegHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import Contect from "./Contect";
import Footer from "./Footer";

const images = [
  "https://images.pexels.com/photos/6347952/pexels-photo-6347952.jpeg",
  "https://images.pexels.com/photos/3768600/pexels-photo-3768600.jpeg",
  "https://images.pexels.com/photos/914930/pexels-photo-914930.jpeg"
];

const categories = [
  {
    name: "Ritu Kumar",
    img: "https://images.pexels.com/photos/5692479/pexels-photo-5692479.jpeg",
    path: "/Rithu"
  },
  {
    name: "Anita Dongre",
    img: "https://images.pexels.com/photos/3738087/pexels-photo-3738087.jpeg",
    path: "/Anita"
  },
  {
    name: "Rohit Bal",
    img: "https://images.pexels.com/photos/10509860/pexels-photo-10509860.jpeg",
    path: "/Rohit"
  },
  {
    name: "Neeta Lulla",
    img: "https://images.pexels.com/photos/5908822/pexels-photo-5908822.jpeg",
    path: "/Neeta"  // IMPORTANT
  }
];

function MarqueeText({ text }) {
  const repeated = Array(30).fill(text).join(" • ");
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-100 py-4">
      <div className="inline-block animate-marquee text-lg font-semibold px-8">
        {repeated}
      </div>
    </div>
  );
}

function StoreLocatorBanner() {
  const locations = ["Wakad, Pune", "Baner, Pune", "Kothrud, Pune", "Andheri, Mumbai"];
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % locations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 mt-4">
      <div className="text-center md:text-left md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-light">
          FIND THE <span className="font-bold">NEAREST STORE</span>
        </h2>
        <p className="text-lg md:text-xl font-medium mt-2">{locations[currentIndex]}</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md"
          onClick={() => navigate("/LocateStore")}
        >
          LOCATE STORE
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg"
          alt="Store Model"
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
   const [showImg, setImg] = useState(0);
  const [showContect, setShowContect] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImg(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">

        {/* Logo */}
        <div className="text-2xl font-bold">TrendyThreads</div>

        {/* Search */}
        <div className="relative w-64">
          <FiSearch className="absolute top-2.5 left-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>

        {/* Navigation + User */}
        <div className="flex items-center gap-8">

          {/* Nav Links */}
          <nav className="flex gap-6 text-lg font-medium">
            <span
              onClick={() => navigate("/home")}
              className="cursor-pointer hover:text-blue-500 text-[16px]"
            >
              Home
            </span>

            <span
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-blue-500 text-[16px]"
            >
              About Us
            </span>

            <span
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:text-blue-500 text-[16px]"
            >
              Contact
            </span>
          </nav>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>

            <div
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-9 h-9 rounded-full border-2 border-gray-200"
              />

              <span className="font-medium text-gray-700">User</span>

              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

                {/* Dashboard */}
                <div
                  onClick={() => navigate("/adminDashboard")}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  <MdDashboard className="text-gray-600 text-lg" />
                  <span className="text-sm font-medium text-gray-700">
                    Dashboard
                  </span>
                </div>

                {/* Logout */}
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition"
                >
                  <FiLogOut className="text-red-500 text-lg" />
                  <span className="text-sm font-medium text-red-500">
                    Logout
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>


      {/* Banner */}
      <div className="relative w-full overflow-hidden p-10">
        <img
          src={images[showImg]}
          alt="carousel"
          className="w-full h-150 object-cover transition-all duration-500 rounded-2xl"
        />

        {/* Left Arrow */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60"
          onClick={() =>
            setImg(prev => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60"
          onClick={() => setImg(prev => (prev + 1) % images.length)}
        >
          <FaChevronRight />
        </button>
      </div>


      {/* Marquee */}
      <MarqueeText text="Designed For Indian Curves" />

      {/* Categories */}
      <div className="py-8 px-6">
        {/* Centered Heading */}
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Our Designers
        </h2>

        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-20">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(cat.path)}
              className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 w-60 text-center 
                   hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-28 h-28 mx-auto rounded-xl object-cover"
              />

              <p className="mt-4 font-semibold text-lg">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-8 mt-5">

        {/* Heading */}
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Recently Added Product
        </h2>

        <div className="flex justify-around space-x-4 overflow-x-auto scroll-smooth custom-scrollbar">

          {/* Product Card 1 */}
          <div className="min-w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300">

            <div className="relative overflow-hidden rounded-lg h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                alt="Product"
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />

              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                <FaRegHeart />
              </button>
            </div>

            <div className="p-2">
              <p className="font-medium">Floral Designer Gown</p>
              <p className="text-red-600 font-semibold">
                ₹2,999
              </p>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                4.5
              </div>
              <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                View
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="min-w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300">

            <div className="relative overflow-hidden rounded-lg h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                alt="Product"
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />

              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                <FaRegHeart />
              </button>
            </div>

            <div className="p-2">
              <p className="font-medium">Floral Designer Gown</p>
              <p className="text-red-600 font-semibold">
                ₹2,999
              </p>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                4.5
              </div>
              <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                View
              </button>
            </div>
          </div>
          {/* Product Card 2 */}
          <div className="min-w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300">

            <div className="relative overflow-hidden rounded-lg h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                alt="Product"
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />

              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                <FaRegHeart />
              </button>
            </div>

            <div className="p-2">
              <p className="font-medium">Floral Designer Gown</p>
              <p className="text-red-600 font-semibold">
                ₹2,999
              </p>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                4.5
              </div>
              <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                View
              </button>
            </div>
          </div>
          {/* Product Card 2 */}
          <div className="min-w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300">

            <div className="relative overflow-hidden rounded-lg h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                alt="Product"
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />

              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                <FaRegHeart />
              </button>
            </div>

            <div className="p-2">
              <p className="font-medium">Floral Designer Gown</p>
              <p className="text-red-600 font-semibold">
                ₹2,999
              </p>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                4.5
              </div>
              <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                View
              </button>
            </div>
          </div>

        </div>
      </div>

      <StoreLocatorBanner />

      {showContect && <Contect onClose={() => setShowContect(false)} />}

      <Footer />

    </div>
  );
}
