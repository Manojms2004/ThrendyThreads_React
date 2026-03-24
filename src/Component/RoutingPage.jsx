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

  console.log("USER:", user);

  if (!user) return <Navigate to="/login" />;

  const role = user.role?.toLowerCase();

  console.log("ROLE:", role);

  // ✅ redirect if wrong route
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
                <Route path="/" element={<Mainpage />} />
                <Route path="/home" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route
                    path="/anita"
                    element={
                        <AnitaDongre
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                        />
                    }
                />

                <Route
                    path="/designer/:id"
                    element={
                        <DesignerPage
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                        />
                    }
                />
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

                <Route path="/locatestore" element={<LocateStore />} />
                <Route path="/home/contact" element={<Contect />} />
                <Route
                    path="/wishlist"
                    element={
                        <Whishlist
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                        />
                    }
                />

                <Route path="/velvet" element={<Velvet />} />
                <Route path="/denim" element={<Denim />} />
                <Route path="/georgette" element={<Georgette />} />
                <Route path="/sarees" element={<Sarees />} />
                <Route path="/livin" element={<Livin />} />
                <Route path="/silk" element={<Silk />} />
                <Route path="/skirts-shorts" element={<SkirtsShorts />} />
                <Route path="/home/about" element={<About />} />

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
    )
}

export default RoutingPage;