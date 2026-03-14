// src/Components/ShopByOccasion.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { allProducts } from "./ProductsData";

export default function ShopByOccasion({
  wishlist = [],
  toggleWishlist = () => {},
  extraProducts = [],
  designer = null,
}) {
  const [selectedCategory, setSelectedCategory] = useState("cotton");
  const navigate = useNavigate();

  const mergedProducts = [...allProducts, ...extraProducts];

  const productsToShow = mergedProducts.filter((product) => {
    if (designer) {
      return product.designer === designer && product.category === selectedCategory;
    }
    return !product.designer && product.category === selectedCategory;
  });

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div style={{ width: "100%", background: "#fff", padding: "8px 0", fontFamily: "sans-serif" }}>

      {/* TITLE */}
      {!designer && (
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#111", marginBottom: "16px", letterSpacing: "-0.01em" }}>
          Shop by Occasion
        </h2>
      )}

      {/* CATEGORY BUTTONS */}
      <div style={{ display: "flex",justifyContent:"center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
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
      <div style={{ maxHeight: "580px", paddingRight: "4px",padding:"20px" }}>
        {productsToShow.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#999", fontSize: "13px", fontWeight: "500" }}>
            No products found in this category.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            {productsToShow.map((product) => (
              <div
                key={product.id}
                style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* IMAGE */}
                <div
                  style={{ position: "relative", height: "240px", overflow: "hidden", cursor: "pointer", background: "#f5f5f5" }}
                  onClick={() => navigate(`/product/${product.id}`, { state: { extraProducts } })}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.07)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />

                  {/* Discount Badge */}
                  {product.discount && (
                    <span style={{ position: "absolute", top: "10px", left: "10px", background: "#111", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px", letterSpacing: "0.08em" }}>
                      {product.discount} OFF
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    style={{ position: "absolute", top: "10px", right: "10px", background: "#fff", border: "none", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.14)", cursor: "pointer" }}
                  >
                    {wishlist.includes(product.id)
                      ? <FaHeart style={{ color: "#111", fontSize: "13px" }} />
                      : <FaRegHeart style={{ color: "#aaa", fontSize: "13px" }} />}
                  </button>
                </div>

                {/* DETAILS */}
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

                  {product.oldPrice && (
                    <span style={{ fontSize: "11px", color: "#bbb", textDecoration: "line-through" }}>
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={() => navigate(`/product/${product.id}`, { state: { extraProducts } })}
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
}