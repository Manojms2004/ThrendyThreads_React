import { useState, useEffect, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaStar, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import Contect from "./Contact";
import Footer from "./Footer";

const images = [
  "https://images.pexels.com/photos/6347952/pexels-photo-6347952.jpeg",
  "https://images.pexels.com/photos/3768600/pexels-photo-3768600.jpeg",
  "https://images.pexels.com/photos/914930/pexels-photo-914930.jpeg"
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
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const imageSrc = user?.image
    ? `data:image/jpeg;base64,${user.image}`
    : "https://i.pravatar.cc/40";

  const [categories, setCategories] = useState([]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };

  const fetchDesigners = async () => {
    try {
      const res = await axios.get(
        "https://localhost:44332/api/Designer/GetAllDesigners"
      );

      const designers = res.data.map((d) => ({
        name: d.designerName,
        img: `data:image/jpeg;base64,${d.designerImage}`,
        path: `/designer/${d.designerId}`
      }));

      setCategories(designers);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

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

  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState({});


  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await axios.get("https://localhost:44332/api/Product/GetRecentProducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch recent products", error);
      }
    };
    fetchRecentProducts();
  }, []);

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleViewClick = (id) => {
    navigate(`/product/${id}`)
  }

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

            {
              user.role === 'user' && <div
                onClick={() => navigate("/checkout")}
                className="cursor-pointer relative"
              >
                <FaShoppingCart size={20} className="hover:text-blue-500" />


              </div>
            }

            <span
              onClick={() => navigate("/home")}
              className="cursor-pointer hover:text-blue-500 text-[16px]"
            >
              Home
            </span>

            <span
              onClick={() => navigate("/home/about")}
              className="cursor-pointer hover:text-blue-500 text-[16px]"
            >
              About Us
            </span>

            <span
              onClick={() => navigate("/home/contact")}
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
                src={imageSrc}
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

        <style>
          {`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  `}
        </style>
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Our Designers
        </h2>

        <div className="relative px-10">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition"
          >
            <FaChevronLeft size={12} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat, i) => (
              <div
                key={i}
                onClick={() => navigate(cat.path)}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image — full card width */}
                <div className="w-full h-[160px] overflow-hidden bg-gray-100 p-2">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform rounded-2xl duration-500"
                  />
                </div>

                {/* Name */}
                <div className="py-2.5 px-3 bg-white border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 text-center tracking-wide truncate">
                    {cat.name}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition"
          >
            <FaChevronRight size={12} />
          </button>

        </div>

      </div>
      <div className="px-8 mt-5">

        {/* Heading */}
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Recently Added Product
        </h2>

        <div className="flex justify-around gap-4 overflow-x-auto pb-2 mt-10 scroll-smooth"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
        >
          {products.map((product) => {
            const id = product.productId;
            const name = product.productName || product.name || "Product";
            const price = product.cost || product.price || product.productPrice || 0;
            const rating = product.rating || 4.5;
            const quantity = product.quantity || product.productQuantity || 0;
            const imageSrc = product.productImage || product.image
              ? `data:image/jpeg;base64,${product.productImage || product.image}`
              : "https://images.unsplash.com/photo-1520975916090-3105956dac38";

            return (
              <div
                key={id}
                className="min-w-[230px] max-w-[230px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[200px] bg-gray-50">
                  <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(id)}
                    className="absolute top-2 right-2 bg-white border border-gray-200 p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
                  >
                    {liked[id]
                      ? <FaHeart className="text-gray-900 text-xs" />
                      : <FaRegHeart className="text-gray-400 text-xs" />
                    }
                  </button>

                  {/* Qty Badge */}
                  {quantity > 0 && (
                    <div className="absolute bottom-2 left-2 bg-black text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Qty: {quantity}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1.5 flex-1">

                  <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1">
                    {name}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">₹{Number(price).toLocaleString()}</p>
                    <div className="flex items-center gap-0.5 text-gray-500">
                      <FaStar className="text-gray-800 text-[10px]" />
                      <span className="text-[11px] font-medium text-gray-600">{rating}</span>
                    </div>
                  </div>

                  <div className="mt-1 border-t border-gray-100 pt-2">
                    <button onClick={() => handleViewClick(id)} className="w-full bg-gray-900 text-white text-xs font-semibold py-2 rounded-lg hover:bg-black transition-colors duration-200 tracking-wide cursor-pointer">
                      View
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StoreLocatorBanner />

      {showContect && <Contect onClose={() => setShowContect(false)} />}

      <Footer />

    </div>
  );
}
