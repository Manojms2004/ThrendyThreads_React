// src/Components/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { allProducts } from "./ProductsData";
import { FaStar, FaHeart, FaRegHeart, FaArrowLeft, FaWhatsapp } from "react-icons/fa";

export default function ProductPage({ wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [requestData, setRequestData] = useState({ name: "", phone: "", message: "" });

  const [apiProduct, setApiProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product from API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://localhost:44332/api/Product/GetProductById/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setApiProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const mergedProducts = [
    ...allProducts,
    ...(location.state?.extraProducts || []),
  ];

  // Related products from local data by category
  const relatedProducts = apiProduct
    ? mergedProducts
        .filter((p) => p.category?.toLowerCase() === apiProduct.category?.toLowerCase() && p.id !== parseInt(id))
        .slice(0, 4)
    : [];

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  // Convert VARBINARY image to base64 src
  const getImageSrc = (imageData) => {
    if (!imageData) return null;
    // If already a URL string
    if (typeof imageData === "string" && imageData.startsWith("http")) return imageData;
    // If base64 string
    if (typeof imageData === "string") return `data:image/jpeg;base64,${imageData}`;
    // If array of bytes
    if (Array.isArray(imageData)) {
      const bytes = new Uint8Array(imageData);
      let binary = "";
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      return `data:image/jpeg;base64,${window.btoa(binary)}`;
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSubmit = () => {
    if (!requestData.name || !requestData.phone) {
      alert("Please enter Name and Phone Number");
      return;
    }
    const finalMessage = `Hello,\n\nProduct: ${apiProduct.productName}\nPrice: ₹${apiProduct.price}\nCategory: ${apiProduct.category}\n\nCustomer Name: ${requestData.name}\nPhone: ${requestData.phone}\n\nRequested Changes:\n${requestData.message || "No details provided"}\n\nThank you.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(finalMessage)}`, "_blank");
    setShowForm(false);
  };

  // Loading State
  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", flexDirection: "column", gap: "12px", background: "#f5f5f5" }}>
      <div style={{ width: "36px", height: "36px", border: "3px solid #eee", borderTop: "3px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: "13px", color: "#999", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" }}>Loading Product...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // Error State
  if (error) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", flexDirection: "column", gap: "10px", background: "#f5f5f5" }}>
      <p style={{ fontSize: "1rem", color: "#111", fontWeight: "700" }}>Failed to load product</p>
      <p style={{ fontSize: "13px", color: "#999" }}>{error}</p>
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px", background: "#111", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "4px", fontSize: "12px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Go Back
      </button>
    </div>
  );

  const imgSrc = getImageSrc(apiProduct.productImage);

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

        {/* LEFT — 70% */}
        <div style={{ width: "70%", display: "flex", gap: "10px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>

          {/* Product Image */}
          <div style={{ width: "45%", position: "relative", background: "#eee", flexShrink: 0 }}>
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={apiProduct.productName}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: "13px" }}>
                No Image
              </div>
            )}
            <button
              onClick={() => toggleWishlist(apiProduct.productId)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", border: "none", borderRadius: "50%", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", cursor: "pointer" }}
            >
              {wishlist.includes(apiProduct.productId)
                ? <FaHeart style={{ color: "#111", fontSize: "15px" }} />
                : <FaRegHeart style={{ color: "#999", fontSize: "15px" }} />}
            </button>
          </div>

          {/* Product Details */}
          <div style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", borderBottom: "2px solid #111", paddingBottom: "2px", width: "fit-content" }}>
              {apiProduct.category}
            </span>

            <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", margin: "8px 0 6px", lineHeight: "1.2" }}>
              {apiProduct.productName}
            </h1>

            {/* Product ID Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ background: "#f0f0f0", color: "#555", padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: "600" }}>
                Product ID: #{apiProduct.productId}
              </span>
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px", marginBottom: "28px" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#111", lineHeight: "1" }}>
                {formatPrice(apiProduct.price)}
              </div>
            </div>

            {/* Details Table */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              {[
                ["Category", apiProduct.category],
                ["Product Name", apiProduct.productName],
                ["Price", formatPrice(apiProduct.price)],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", minWidth: "90px" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
              <button
                onClick={() => navigate("/checkout", { state: { product: apiProduct } })}
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
                style={{ cursor: "pointer", background: "#fff", borderRadius: "6px", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: "1px solid #ececec", display: "flex" }}
              >
                <img
                  src={relProd.img}
                  alt={relProd.name}
                  style={{ width: "90px", height: "90px", objectFit: "cover", flexShrink: 0 }}
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