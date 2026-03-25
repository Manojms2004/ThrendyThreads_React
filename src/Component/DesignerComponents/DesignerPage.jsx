import React, { useState, useEffect, useRef } from "react";
import ShopByOccasion from "../ShopByOccasion";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function DesignerPage({ wishlist, toggleWishlist }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [extraProducts, setExtraProducts] = useState([]);
  const { id } = useParams();
  const [designer, setDesigner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    price: "",
    category: "cotton",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const shopRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const res = await axios.get(
          `https://localhost:44332/api/Designer/GetDesignerById/${id}`
        );

        setDesigner(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDesigner();
  }, [id]);

  const handleAddPro = () => {
    setIsAdmin(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUploadProduct = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];

      setFormData((prev) => ({
        ...prev,
        img: base64
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.img || !formData.price || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const payload = {
        productId: 0,
        productName: formData.name,
        productImage: formData.img,
        price: Number(formData.price),
        category: formData.category,
        designerId: id,
        cartId: 0
      };

      await axios.post(
        "https://localhost:44332/api/Product/AddProduct",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Product added successfully");

      // refresh products
      // fetchProducts();

      // reset

      shopRef.current?.refetch();
      setFormData({
        name: "",
        img: "",
        price: "",
        category: "cotton"
      });

      setShowModal(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div style={{ background: "#f9f8f6", minHeight: "100vh", fontFamily: "sans-serif" }}>

      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate('/home')}
        style={{
          position: "fixed",       // ✅ FIXED POSITION
          top: "20px",             // distance from top
          left: "20px",            // distance from left
          zIndex: 1000,            // stay above all content
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#111",
          color: "#fff",
          border: "none",
          padding: "7px 14px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          letterSpacing: "0.05em",
          width: "fit-content"
        }}
      >
        <FaArrowLeft size={10} /> Back
      </button>

      {/* HERO BANNER */}
      <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden", background: "#111" }}>
        <img
          src={`data:image/jpeg;base64,${designer?.designerImage}`}
          alt="Desinger"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.22em", textTransform: "uppercase", color: "#ccc", marginBottom: "10px" }}>
            Featured Designer
          </span>
          <h1 style={{ fontSize: "3rem", fontWeight: "900", color: "#fff", margin: "0 0 8px", lineHeight: "1.1", letterSpacing: "-0.02em" }}>
            {designer?.designerName}
          </h1>
          <p style={{ fontSize: "15px", color: "#ddd", margin: 0, fontWeight: "400", letterSpacing: "0.03em" }}>
            Pioneer of Indian Couture & Traditional Textile Revival
          </p>
        </div>
        {/* bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to bottom, transparent, #f9f8f6)" }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "0 24px 40px" }}>

        {/* Designer Info Card */}
        <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", marginTop: "-40px", position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", gap: "0", overflow: "hidden" }}>

          {/* Left — Photo */}
          <div style={{ width: "220px", flexShrink: 0, background: "#111", position: "relative" }}>
            <img
              src={`data:image/jpeg;base64,${designer?.designerImage}`}
              alt="Designer"
              style={{ width: "100%", height: "100%", minHeight: "280px", objectFit: "cover", display: "block", opacity: 0.85 }}
            />
            <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
              <span style={{ background: "#fff", color: "#111", fontSize: "10px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "3px" }}>
                Est. 1969
              </span>
            </div>
          </div>

          {/* Right — Details */}
          <div style={{ flex: 1, minWidth: "260px", padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            <div>
              {/* About */}
              <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", margin: "0 0 14px" }}>
                <strong style={{ color: "#111" }}>Ritu Kumar</strong> is one of India's most celebrated fashion designers,
                known for reviving traditional Indian textiles and craftsmanship. Since the late 1960s, she has played a
                major role in bringing ancient embroidery techniques and handwoven fabrics back into contemporary fashion.
                Her collections blend heritage embroidery, hand block printing, and luxurious fabrics with modern silhouettes.
              </p>

              {/* Highlights */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
                {[
                  "50+ Years in Fashion",
                  "Traditional Embroidery Revival",
                  "International Shows",
                  "Bridal Couture",
                  "Sustainable Fashion",
                ].map((tag) => (
                  <span key={tag} style={{ background: "#f0f0f0", color: "#333", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", letterSpacing: "0.04em" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats + Button Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", borderTop: "1px solid #eee", paddingTop: "16px" }}>

              {/* Stats */}
              <div style={{ display: "flex", gap: "24px" }}>
                {[["50+", "Years"], ["200+", "Designs"], ["12", "Awards"]].map(([num, label]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "#111", lineHeight: "1" }}>{num}</div>
                    <div style={{ fontSize: "10px", color: "#999", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Add Design Button */}
              {
                user.role === 'designer' && <button
                  onClick={handleAddPro}
                  style={{ background: "#111", color: "#fff", border: "2px solid #111", padding: "10px 22px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
                >
                  + Add Design
                </button>
              }

            </div>

          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "30px 0 20px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", color: "#999" }}>Collections</span>
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
        </div>

        {/* Products Section */}
        <ShopByOccasion
          ref={shopRef}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          extraProducts={extraProducts}
          designerId={id}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "16px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "400px", borderRadius: "8px", padding: "24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

            <h2 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#111", marginBottom: "18px", letterSpacing: "-0.01em" }}>
              Add New Design
            </h2>

            <input
              type="text" name="name" placeholder="Product Name"
              value={formData.name} onChange={handleChange}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "10px", boxSizing: "border-box", fontFamily: "inherit" }}
            />

            <input
              type="file" accept="image/*"
              onChange={(e) => handleImageUploadProduct(e.target.files[0])}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#555", outline: "none", marginBottom: "10px", boxSizing: "border-box", cursor: "pointer" }}
            />

            <input
              type="number" name="price" placeholder="Price (₹)"
              value={formData.price} onChange={handleChange}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "10px", boxSizing: "border-box", fontFamily: "inherit" }}
            />

            <select
              name="category" value={formData.category} onChange={handleChange}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "18px", boxSizing: "border-box", background: "#fff", cursor: "pointer" }}
            >
              <option value="cotton">Cotton</option>
              <option value="banarasi">Banarasi</option>
              <option value="wedding">Wedding</option>
            </select>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ flex: 1, background: "#fff", color: "#111", border: "2px solid #ccc", padding: "10px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                style={{ flex: 2, background: "#111", color: "#fff", border: "2px solid #111", padding: "10px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                Add Product
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}