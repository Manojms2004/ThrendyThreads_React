// src/Checkout.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingBag, FaCheckCircle, FaTrash, FaLock } from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState(null);
  const [paying, setPaying] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const fetchCart = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`https://localhost:44332/api/Product/GetCartProducts/${userId}`);
      const mapped = res.data.map((p) => ({
        id: p.productId,
        cartId: p.cartId,
        name: p.productName,
        img: p.productImage ? `data:image/jpeg;base64,${p.productImage}` : "https://via.placeholder.com/150",
        price: p.price,
      }));
      setCartItems(mapped);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setUpiId("");
    setSelectedUpiApp(null);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    if (!upiId && !selectedUpiApp) {
      alert("Please enter UPI ID or select a payment app");
      return;
    }
    setPaying(true);
    try {
      await axios.put(
        `https://localhost:44332/api/Product/UpdateCart?productId=${selectedProduct.id}&cartId=${selectedProduct.cartId ?? -1}`
      );
      await fetchCart();
      setTimeout(() => {
        setPaying(false);
        setPaymentSuccess(true);
        setShowPayment(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setPaying(false);
      alert("Payment failed. Please try again.");
    }
  };

  // Add this function with your other handlers
const handleDelete = async (item) => {
  try {
    await axios.put(
      `https://localhost:44332/api/Product/UpdateCart?productId=${item.id}&cartId=${-1}`
    );
    await fetchCart();
  } catch (err) {
    console.error(err);
    alert("Failed to remove item.");
  }
};

  const upiApps = [
    { id: "gpay", label: "GPay", icon: <SiGooglepay size={22} /> },
    { id: "phonepe", label: "PhonePe", icon: <SiPhonepe size={20} /> },
    { id: "paytm", label: "Paytm", icon: <SiPaytm size={20} /> },
  ];

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", flexDirection: "column", gap: "12px", background: "#f5f5f5" }}>
      <div style={{ width: "36px", height: "36px", border: "3px solid #eee", borderTop: "3px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: "12px", color: "#999", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading Cart...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "sans-serif", padding: "16px" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#111", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", fontSize: "12px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          <FaArrowLeft size={10} /> Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaShoppingBag size={18} style={{ color: "#111" }} />
          <h2 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#111", margin: 0, letterSpacing: "-0.02em" }}>My Cart</h2>
          {cartItems.length > 0 && (
            <span style={{ background: "#111", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "20px" }}>
              {cartItems.length} items
            </span>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase" }}>Total</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "900", color: "#111" }}>{formatPrice(totalPrice)}</div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {cartItems.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "80px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <FaShoppingBag size={48} style={{ color: "#ddd" }} />
          <p style={{ fontSize: "1rem", fontWeight: "700", color: "#aaa", letterSpacing: "0.05em" }}>Your cart is empty</p>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "#111", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "14px" }}>
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 10px rgba(0,0,0,0.07)", border: "1px solid #ececec", display: "flex", animation: "fadeIn 0.3s ease forwards", animationDelay: `${index * 0.05}s`, opacity: 0 }}
          >
            <div style={{ width: "110px", flexShrink: 0, background: "#f0f0f0", position: "relative", overflow: "hidden" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "120px" }} />
              <div style={{ position: "absolute", top: "8px", left: "8px", background: "#111", color: "#fff", fontSize: "9px", fontWeight: "800", padding: "2px 6px", borderRadius: "2px", letterSpacing: "0.06em" }}>
                #{index + 1}
              </div>
            </div>

            <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb" }}>Item</span>
                <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#111", margin: "3px 0 6px", lineHeight: "1.3" }}>{item.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>Price</span>
                  <span style={{ fontSize: "15px", fontWeight: "900", color: "#111" }}>{formatPrice(item.price)}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  onClick={() => handleBuy(item)}
                  style={{ flex: 1, background: "#111", color: "#fff", border: "2px solid #111", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
                >
                  Buy Now
                </button>
                <button
  onClick={() => handleDelete(item)}
  style={{ background: "#fff", color: "#111", border: "2px solid #ececec", padding: "8px 10px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
>
  <FaTrash size={11} style={{ color: "#bbb" }} />
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Bar */}
      {cartItems.length > 0 && (
        <div style={{ marginTop: "20px", background: "#fff", borderRadius: "10px", padding: "16px 20px", boxShadow: "0 1px 10px rgba(0,0,0,0.07)", border: "1px solid #ececec", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Order Summary</div>
            <div style={{ fontSize: "10px", color: "#aaa", marginBottom: "2px" }}>{cartItems.length} item{cartItems.length > 1 ? "s" : ""} in cart</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#111" }}>{formatPrice(totalPrice)}</div>
          </div>
          <button
            onClick={() => { setSelectedProduct({ id: cartItems[0]?.id, cartId: cartItems[0]?.cartId ?? -1, name: "All Cart Items", price: totalPrice }); setShowPayment(true); }}
            style={{ background: "#111", color: "#fff", border: "2px solid #111", padding: "12px 32px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
          >
            Checkout All — {formatPrice(totalPrice)}
          </button>
        </div>
      )}

      {/* UPI PAYMENT MODAL */}
      {showPayment && selectedProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "16px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "400px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.3)" }}>

            {/* Modal Header */}
            <div style={{ background: "#111", padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaLock size={11} style={{ color: "#888" }} />
                <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888" }}>Secure UPI Payment</span>
              </div>
              <button onClick={() => setShowPayment(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "50%", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            <div style={{ padding: "22px 24px" }}>

              {/* Order Info */}
              <div style={{ background: "#f7f7f7", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "9px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Paying for</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#111" }}>{selectedProduct.name}</div>
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#111" }}>{formatPrice(selectedProduct.price)}</div>
              </div>

              {/* UPI App Selector */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "10px" }}>
                  Select UPI App
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {upiApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedUpiApp(app.id)}
                      style={{ flex: 1, padding: "12px 8px", border: selectedUpiApp === app.id ? "2px solid #111" : "2px solid #ececec", borderRadius: "8px", background: selectedUpiApp === app.id ? "#111" : "#fff", color: selectedUpiApp === app.id ? "#fff" : "#555", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", transition: "all 0.15s", fontSize: "10px", fontWeight: "700", letterSpacing: "0.06em" }}
                    >
                      {app.icon}
                      {app.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{ flex: 1, height: "1px", background: "#eee" }} />
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase" }}>or enter UPI ID</span>
                <div style={{ flex: 1, height: "1px", background: "#eee" }} />
              </div>

              {/* UPI ID Input */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "5px" }}>UPI ID</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "10px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
                <p style={{ fontSize: "10px", color: "#bbb", margin: "5px 0 0", letterSpacing: "0.02em" }}>Example: name@okicici, name@ybl, name@paytm</p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={paying}
                style={{ width: "100%", background: "#111", color: "#fff", border: "2px solid #111", padding: "13px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: "4px", cursor: paying ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: paying ? 0.7 : 1 }}
              >
                {paying ? (
                  <>
                    <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Processing...
                  </>
                ) : (
                  <><FaLock size={11} /> Pay {formatPrice(selectedProduct.price)}</>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "10px", color: "#bbb", marginTop: "10px", letterSpacing: "0.04em" }}>
                🔒 Your payment is secured and encrypted
              </p>

            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "16px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "360px", borderRadius: "12px", padding: "40px 32px", textAlign: "center", boxShadow: "0 16px 60px rgba(0,0,0,0.3)" }}>
            <FaCheckCircle size={52} style={{ color: "#111", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#111", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Payment Successful!</h2>
            <p style={{ fontSize: "12px", color: "#999", margin: "0 0 28px", lineHeight: "1.6" }}>
              Your order has been placed successfully. Thank you for shopping with us.
            </p>
            <div style={{ width: "40px", height: "2px", background: "#111", borderRadius: "2px", margin: "0 auto 24px" }} />
            <button
              onClick={() => { setPaymentSuccess(false); navigate("/home"); }}
              style={{ width: "100%", background: "#111", color: "#fff", border: "2px solid #111", padding: "12px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}