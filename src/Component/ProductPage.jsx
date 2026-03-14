// src/Components/ProductPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { allProducts } from "./ProductsData";
import { FaStar, FaHeart, FaRegHeart, FaArrowLeft, FaWhatsapp } from "react-icons/fa";

export default function ProductPage({ wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [requestData, setRequestData] = useState({ name: "", phone: "", message: "" });

  const mergedProducts = [
    ...allProducts,
    ...(location.state?.extraProducts || []),
  ];

  const product = mergedProducts.find((p) => p.id === parseInt(id));

  if (!product)
    return (
      <div style={{ padding: "2rem", fontSize: "1.2rem", color: "#111" }}>
        Product not found.
      </div>
    );

  const relatedProducts = mergedProducts
    .filter((p) => {
      if (product.designer) {
        return p.category === product.category && p.designer === product.designer && p.id !== product.id;
      }
      return p.category === product.category && !p.designer && p.id !== product.id;
    })
    .slice(0, 4);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSubmit = () => {
    if (!requestData.name || !requestData.phone) {
      alert("Please enter Name and Phone Number");
      return;
    }
    const finalMessage = `Hello,\n\nProduct: ${product.name}\nPrice: ₹${product.finalPrice}\nCategory: ${product.category}\n\nCustomer Name: ${requestData.name}\nPhone: ${requestData.phone}\n\nRequested Changes:\n${requestData.message || "No details provided"}\n\nThank you.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(finalMessage)}`, "_blank");
    setShowForm(false);
  };

  return (
    <div style={{ background: "#f5f5f5", height: "100vh", overflow: "hidden", padding: "10px", fontFamily: "sans-serif", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#111", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginBottom: "10px", letterSpacing: "0.05em", width: "fit-content" }}
      >
        <FaArrowLeft size={10} /> Back
      </button>

      {/* Main Layout: 70% left + 30% right */}
      <div style={{ display: "flex", gap: "10px", flex: 1, overflow: "hidden" }}>

        {/* LEFT — 70% — Product Image + Details */}
        <div style={{ width: "70%", display: "flex", gap: "10px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>

          {/* Product Image */}
          <div style={{ width: "45%", position: "relative", background: "#eee", flexShrink: 0 }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", border: "none", borderRadius: "50%", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", cursor: "pointer" }}
            >
              {wishlist.includes(product.id)
                ? <FaHeart style={{ color: "#111", fontSize: "15px" }} />
                : <FaRegHeart style={{ color: "#999", fontSize: "15px" }} />}
            </button>
          </div>

          {/* Product Details */}
          <div style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", borderBottom: "2px solid #111", paddingBottom: "2px", width: "fit-content" }}>
              {product.category}
            </span>

            <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", margin: "8px 0 6px", lineHeight: "1.2" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
              <span style={{ background: "#111", color: "#fff", padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                <FaStar size={9} /> {product.rating}
              </span>
              <span style={{ fontSize: "11px", color: "#999" }}>({product.reviews} reviews)</span>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px", marginBottom: "40px" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#111", lineHeight: "1" }}>
                {formatPrice(product.finalPrice)}
              </div>
              {product.oldPrice && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
                  <span style={{ textDecoration: "line-through", color: "#bbb", fontSize: "13px" }}>
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span style={{ background: "#111", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "3px", letterSpacing: "0.08em" }}>
                    {product.discount} OFF
                  </span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => navigate("/checkout", { state: { product } })}
                style={{ flex: 1, background: "#111", color: "#fff", border: "2px solid #111", padding: "10px 12px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                Buy Now
              </button>
              <button
                onClick={() => setShowForm(true)}
                style={{ flex: 1, background: "#fff", color: "#111", border: "2px solid #111", padding: "10px 12px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                Request Change
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT — 30% — Related Products */}
        <div style={{ width: "30%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          <h2 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: "0 0 4px 0", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Related Products
          </h2>
          <div style={{ width: "32px", height: "2px", background: "#111", borderRadius: "2px", marginBottom: "10px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", flex: 1, paddingRight: "2px" }}>
            {relatedProducts.length === 0 && (
              <p style={{ fontSize: "12px", color: "#999" }}>No related products found.</p>
            )}
            {relatedProducts.map((relProd) => (
              <div
                key={relProd.id}
                onClick={() => navigate(`/product/${relProd.id}`, { state: { extraProducts: location.state?.extraProducts } })}
                style={{height:"300px", cursor: "pointer", background: "#fff", borderRadius: "6px", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: "1px solid #ececec", display: "flex", gap: "0" }}
              >
                <img
                  src={relProd.img}
                  alt={relProd.name}
                  style={{ width: "150px", height: "200px", objectFit: "cover", flexShrink: 0 }}
                />
                <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                  <p style={{ fontSize: "12px", fontWeight: "600", color: "#222", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {relProd.name}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", margin: 0 }}>
                    {formatPrice(relProd.finalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* REQUEST CHANGE MODAL */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "16px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "400px", borderRadius: "8px", padding: "22px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

            <h2 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#111", marginBottom: "14px" }}>
              Request Outfit Change
            </h2>

            <input
              type="text" name="name" placeholder="Your Name"
              value={requestData.name} onChange={handleInputChange}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "8px", boxSizing: "border-box" }}
            />
            <input
              type="tel" name="phone" placeholder="Phone Number"
              value={requestData.phone} onChange={handleInputChange}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "8px", boxSizing: "border-box" }}
            />
            <textarea
              name="message" placeholder="Describe what changes you want..."
              value={requestData.message} onChange={handleInputChange}
              rows={3}
              style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", marginBottom: "14px", boxSizing: "border-box", resize: "none", fontFamily: "inherit" }}
            />

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setShowForm(false)}
                style={{ flex: 1, background: "#fff", color: "#111", border: "2px solid #ccc", padding: "9px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{ flex: 2, background: "#111", color: "#fff", border: "2px solid #111", padding: "9px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <FaWhatsapp size={13} /> Send via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}