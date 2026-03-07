// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Components
import Mainpage from "./Component1/Mainpage";
import HomePage from "./HomePage";
import LoginPage from "./Component1/LoginPage";
import SignupPage from "./Component1/SignupPage";
import AnitaDongre from "./AnitaDongre";
import RituDesigner from "./Component1/Component4/RituDesigner";
import LocateStore from "./LocateStore";
import Contect from "./Contect";
import Whishlist from "./Whishlist";
import AdminDashboard from "./AdminDashboard";
import ProductPage from "./ProductPage";
import NeetuLulla from "./Component1/Component4/NeetuLulla";// Category Pages
import Velvet from "./Component1/Component3/Velvet";
import Denim from "./Component1/Component3/Denim";
import Georgette from "./Component1/Component3/Georgette";
import Sarees from "./Component1/Component3/Sarees";
import Livin from "./Component1/Component3/Livin";
import Silk from "./Component1/Component3/Silk";
import SkirtsShorts from "./Component1/Component3/SkirtsShorts";
import RohitBal from "./Component1/Component4/RohitBal";
import Checkout from "./Checkout";
import About from "./About";

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
        <Route
          path="/Neeta"
          element={
            <NeetuLulla
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        <Route
          path="/rohit"
          element={
            <RohitBal
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

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
    </Router>
  );
}