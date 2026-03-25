// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mainpage from "./Mainpage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AnitaDongre from "./AnitaDongre";
import DesignerPage from "./DesignerComponents/DesignerPage";
import LocateStore from "./LocateStore";
import Contect from "./Contact";
import Whishlist from "./Whishlist";
import AdminDashboard from "./AdminDashBoardComponents/AdminDashboard";
import ProductPage from "./ProductPage";
import Velvet from "./DesingsComponents/Velvet";
import Denim from "./DesingsComponents/Denim";
import Georgette from "./DesingsComponents/Georgette";
import Sarees from "./DesingsComponents/Sarees";
import Livin from "./DesingsComponents/Livin";
import Silk from "./DesingsComponents/Silk";
import SkirtsShorts from "./DesingsComponents/SkirtsShorts";
import Checkout from "./Checkout";
import About from "./About";
import UserDashBoard from "./AdminDashBoardComponents/UserDashBoard";
import DesignerDashBoard from "./AdminDashBoardComponents/DesignerDashboard";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }

  if (!user) return <Navigate to="/login" />;

  const role = user.role?.toLowerCase();

  // Role-based restriction (UNCHANGED)
  if (allowedRole && role !== allowedRole.toLowerCase()) {
    if (role === "admin") return <Navigate to="/adminDashboard" />;
    if (role === "designer") return <Navigate to="/desingerDashboard" />;
    if (role === "user") return <Navigate to="/userDashboard" />;
  }

  return children;
};

const RoutingPage = () => {
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

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* PROTECTED ROUTES (NO ROLE) */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        <Route
          path="/anita"
          element={
            <ProtectedRoute>
              <AnitaDongre wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/designer/:id"
          element={
            <ProtectedRoute>
              <DesignerPage wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductPage wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </ProtectedRoute>
          }
        />

        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        <Route path="/locatestore" element={<ProtectedRoute><LocateStore /></ProtectedRoute>} />

        <Route path="/home/contact" element={<ProtectedRoute><Contect /></ProtectedRoute>} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Whishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </ProtectedRoute>
          }
        />

        <Route path="/velvet" element={<ProtectedRoute><Velvet /></ProtectedRoute>} />
        <Route path="/denim" element={<ProtectedRoute><Denim /></ProtectedRoute>} />
        <Route path="/georgette" element={<ProtectedRoute><Georgette /></ProtectedRoute>} />
        <Route path="/sarees" element={<ProtectedRoute><Sarees /></ProtectedRoute>} />
        <Route path="/livin" element={<ProtectedRoute><Livin /></ProtectedRoute>} />
        <Route path="/silk" element={<ProtectedRoute><Silk /></ProtectedRoute>} />
        <Route path="/skirts-shorts" element={<ProtectedRoute><SkirtsShorts /></ProtectedRoute>} />
        <Route path="/home/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

        {/* ROLE BASED ROUTES (UNCHANGED) */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userDashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/desingerDashboard"
          element={
            <ProtectedRoute allowedRole="designer">
              <DesignerDashBoard />
            </ProtectedRoute>
          }
        />

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
};

export default RoutingPage;