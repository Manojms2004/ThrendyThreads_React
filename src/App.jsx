// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages & Components
import Mainpage from "./Component/Mainpage";
import HomePage from "./Component/HomePage";
import LoginPage from "./Component/LoginPage";
import SignupPage from "./Component/SignupPage";
import AnitaDongre from "./Component/AnitaDongre";
import RituDesigner from "./Component/DesignerComponents/DesignerPage";
import LocateStore from "./Component/LocateStore";
import Contect from "./Component/Contect";
import Whishlist from "./Component/Whishlist";
import AdminDashboard from "./Component/AdminDashBoardComponents/AdminDashboard";
import ProductPage from "./Component/ProductPage";
// import NeetuLulla from "./Component1/DesignerDashBoard/NeetuLulla";
import Velvet from "./Component/DesingsComponents/Velvet";
import Denim from "./Component/DesingsComponents/Denim";
import Georgette from "./Component/DesingsComponents/Georgette";
import Sarees from "./Component/DesingsComponents/Sarees";
import Livin from "./Component/DesingsComponents/Livin";
import Silk from "./Component/DesingsComponents/Silk";
import SkirtsShorts from "./Component/DesingsComponents/SkirtsShorts";
// import RohitBal from "./Component1/DesignerDashBoard/RohitBal";
import Checkout from "./Component/Checkout";
import About from "./Component/About";

export default function App() {
  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist_sarees_v1")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist_sarees_v1", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Router>
      <Routes>

        {/* ================= HOME ================= */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/home" element={<HomePage />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ================= DESIGNERS ================= */}
        <Route
          path="/anita"
          element={
            <AnitaDongre
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        {/* SUPPORT BOTH /Rithu AND /ritu */}
        <Route
          path="/Rithu"
          element={
            <RituDesigner
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/ritu"
          element={
            <RituDesigner
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        {/* <Route
          path="/Neeta"
          element={
            <NeetuLulla
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        /> */}
        {/* <Route
          path="/rohit"
          element={
            <RohitBal
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        /> */}

        {/* ================= PRODUCT DETAILS ================= */}
        <Route
          path="/product/:id"
          element={
            <ProductPage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* ================= INFO PAGES ================= */}
        <Route path="/locatestore" element={<LocateStore />} />
        <Route path="/contact" element={<Contect />} />
        <Route
          path="/wishlist"
          element={
            <Whishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        {/* ================= CATEGORIES ================= */}
        <Route path="/velvet" element={<Velvet />} />
        <Route path="/denim" element={<Denim />} />
        <Route path="/georgette" element={<Georgette />} />
        <Route path="/sarees" element={<Sarees />} />
        <Route path="/livin" element={<Livin />} />
        <Route path="/silk" element={<Silk />} />
        <Route path="/skirts-shorts" element={<SkirtsShorts />} />
        <Route path="/about" element={<About />} />



      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}