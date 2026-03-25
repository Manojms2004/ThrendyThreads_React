import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const ShopByOccasion = forwardRef(function ShopByOccasion({
  wishlist = [],
  toggleWishlist = () => {},
  extraProducts = [],
  designerId,
}, ref) {
  const [selectedCategory, setSelectedCategory] = useState("cotton");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ fetchProducts defined OUTSIDE useEffect so useImperativeHandle can access it
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `https://localhost:44332/api/Product/GetProductsByDesignerId/${designerId}`
      );
      const mapped = res.data.map((p) => ({
        id: p.productId,
        name: p.productName,
        img: p.productImage && p.productImage !== "undefined"
          ? `data:image/jpeg;base64,${p.productImage}`
          : "https://via.placeholder.com/300",
        finalPrice: p.price,
        category: p.category?.trim().toLowerCase(),
        rating: 4.5,
        designerId: p.designerId,
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  // ✅ useImperativeHandle OUTSIDE useEffect
  useImperativeHandle(ref, () => ({
    refetch: fetchProducts,
  }));

  useEffect(() => {
    if (designerId) {
      fetchProducts();
    } else {
      console.log("DesignerId missing");
    }
  }, [designerId]);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div style={{ width: "100%", background: "#fff", padding: "8px 0", fontFamily: "sans-serif" }}>

      {!designerId && (
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#111", marginBottom: "16px", letterSpacing: "-0.01em" }}>
          Shop by Occasion
        </h2>
      )}

      {/* CATEGORY BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["cotton", "banarasi", "wedding"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 20px",
              border: "2px solid #111",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              background: selectedCategory === cat ? "#111" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#111",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ maxHeight: "580px", paddingRight: "4px", padding: "20px" }}>
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#999", fontSize: "13px", fontWeight: "500" }}>
            No products found in this category.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div
                  style={{ position: "relative", height: "240px", overflow: "hidden", cursor: "pointer", background: "#f5f5f5" }}
                  onClick={() => navigate(`/product/${product.id}`, { state: { designerId: product.designerId } })}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.07)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", border: "none", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.14)", cursor: "pointer" }}
                  >
                    {wishlist.includes(product.id)
                      ? <FaHeart style={{ color: "#111", fontSize: "13px" }} />
                      : <FaRegHeart style={{ color: "#aaa", fontSize: "13px" }} />}
                  </button>
                </div>

                <div style={{ padding: "10px 12px 12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#222", margin: "0 0 5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "#111" }}>
                      {formatPrice(product.finalPrice)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: "600", color: "#555", background: "#f0f0f0", padding: "2px 7px", borderRadius: "20px" }}>
                      <FaStar style={{ color: "#111", fontSize: "9px" }} /> {product.rating}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product.id}`, { state: { designerId: product.designerId } })}
                    style={{ marginTop: "10px", width: "100%", background: "#111", color: "#fff", border: "2px solid #111", padding: "7px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
                  >
                    View Product
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
});

export default ShopByOccasion;