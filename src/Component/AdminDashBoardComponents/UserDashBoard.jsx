import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaShoppingBag, FaHeart, FaBox, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function UserDashBoard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // Fetch All Products
  useEffect(() => {
    axios.get("https://localhost:44332/api/Product/GetAllProducts")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch Cart from API
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await axios.get(`https://localhost:44332/api/Product/GetCartProducts/${userId}`);
      const mapped = res.data.map((p) => ({
        id: p.productId,
        cartId: p.cartId,
        name: p.productName,
        img: p.productImage ? `data:image/jpeg;base64,${p.productImage}` : "https://via.placeholder.com/150",
        price: p.price,
      }));
      setCart(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const handleDeleteCart = async (item) => {
    try {
      await axios.put(
        `https://localhost:44332/api/Product/UpdateCart?productId=${item.id}&cartId=${item.cartId ?? -1}`
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const addToFavorites = (product) => {
    setFavorites([...favorites, product]);
  };

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f5f5f5", fontFamily: "sans-serif" }}>

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 1000, display: "inline-flex", alignItems: "center", gap: "6px", background: "#111", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.05em" }}
      >
        <FaArrowLeft size={10} /> Back
      </button>

      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#111", color: "#fff", padding: "28px 20px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h1 style={{ fontSize: "1rem", fontWeight: "900", letterSpacing: "-0.01em", marginBottom: "28px", color: "#fff" }}>User Dashboard</h1>
        <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", cursor: "pointer" }}>
          Dashboard
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "28px 24px", overflowY: "auto" }}>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#111", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Dashboard</h2>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>

          {/* Products Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaBox size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Shop</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>{products.length}</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Total Products</div>
            <button
              onClick={() => { setShowProducts(!showProducts); setShowCart(false); setShowFavorites(false); }}
              style={{ width: "100%", background: showProducts ? "#111" : "#f0f0f0", color: showProducts ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showProducts ? "Hide Products" : "View Products"}
            </button>
          </div>

          {/* Cart Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaShoppingBag size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Cart</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>{cart.length}</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Cart Items</div>
            <button
              onClick={() => {
                if (!showCart) fetchCart();
                setShowCart(!showCart);
                setShowProducts(false);
                setShowFavorites(false);
              }}
              style={{ width: "100%", background: showCart ? "#111" : "#f0f0f0", color: showCart ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showCart ? "Hide Cart" : "View Cart"}
            </button>
          </div>

          {/* Favorites Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaHeart size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Wishlist</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>{favorites.length}</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Favourites</div>
            <button
              onClick={() => { setShowFavorites(!showFavorites); setShowProducts(false); setShowCart(false); }}
              style={{ width: "100%", background: showFavorites ? "#111" : "#f0f0f0", color: showFavorites ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showFavorites ? "Hide Favorites" : "View Favorites"}
            </button>
          </div>
        </div>

        {/* Products List */}
        {showProducts && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>All Products</h3>
              <span style={{ fontSize: "10px", fontWeight: "700", background: "#111", color: "#fff", padding: "3px 8px", borderRadius: "20px" }}>{products.length} items</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {products.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: "1px solid #f0f0f0", borderRadius: "6px", background: "#fafafa" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", margin: "0 0 2px" }}>{p.productName}</p>
                    <p style={{ fontSize: "12px", color: "#999", margin: 0, fontWeight: "500" }}>{formatPrice(p.price)}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => addToFavorites(p)}
                      style={{ background: "#fff", color: "#111", border: "1.5px solid #ddd", padding: "6px 10px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}
                    >
                      <FaHeart size={11} style={{ color: "#aaa" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart List */}
        {showCart && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Cart Items</h3>
              {cart.length > 0 && (
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#111" }}>{formatPrice(totalCartPrice)}</span>
              )}
            </div>

            {cartLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "30px 0", gap: "10px" }}>
                <div style={{ width: "20px", height: "20px", border: "2px solid #eee", borderTop: "2px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <span style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>Loading cart...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0", color: "#bbb", fontSize: "13px", fontWeight: "500" }}>
                <FaShoppingBag size={28} style={{ color: "#ddd", marginBottom: "8px", display: "block", margin: "0 auto 8px" }} />
                Your cart is empty
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cart.map((item, i) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", border: "1px solid #f0f0f0", borderRadius: "8px", background: "#fafafa" }}>
                    {/* Index badge */}
                    <div style={{ width: "24px", height: "24px", background: "#111", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "800", flexShrink: 0 }}>
                      {i + 1}
                    </div>

                    {/* Image */}
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ececec", flexShrink: 0 }}
                    />

                    {/* Info */}
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: "9px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Item</div>
                      <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                      <div style={{ fontSize: "9px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1px" }}>Price</div>
                      <p style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0 }}>{formatPrice(item.price)}</p>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteCart(item)}
                      style={{ background: "#fff", border: "1.5px solid #ececec", borderRadius: "4px", padding: "7px 9px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    >
                      <FaTrash size={11} style={{ color: "#bbb" }} />
                    </button>
                  </div>
                ))}

                {/* Cart Total Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#111", borderRadius: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>{cart.length} item{cart.length > 1 ? "s" : ""} in cart</span>
                  <span style={{ fontSize: "14px", fontWeight: "900", color: "#fff" }}>{formatPrice(totalCartPrice)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Favorites List */}
        {showFavorites && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Favourites</h3>
              <span style={{ fontSize: "10px", fontWeight: "700", background: "#111", color: "#fff", padding: "3px 8px", borderRadius: "20px" }}>{favorites.length} items</span>
            </div>
            {favorites.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0", color: "#bbb", fontSize: "13px" }}>
                <FaHeart size={28} style={{ color: "#ddd", display: "block", margin: "0 auto 8px" }} />
                No favourites yet
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {favorites.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: "1px solid #f0f0f0", borderRadius: "6px", background: "#fafafa" }}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", margin: 0 }}>{item.productName}</p>
                    <FaHeart size={12} style={{ color: "#111" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}