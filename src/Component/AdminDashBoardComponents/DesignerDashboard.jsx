import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaBox, FaUsers, FaEnvelope, FaUser } from "react-icons/fa";

export default function DesignerDashBoard() {
  const [designs, setDesigns] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [showDesign, setShowDesign] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [loadingDesigns, setLoadingDesigns] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Registration/GetUsers");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Designer Products
  const fetchDesigns = async () => {
    try {
      setLoadingDesigns(true);
      const res = await axios.get(`https://localhost:44332/api/Product/GetProductsByDesignerId/${userId}`);
      const mapped = res.data.map((p) => ({
        id: p.productId,
        name: p.productName,
        img: p.productImage ? `data:image/jpeg;base64,${p.productImage}` : "https://via.placeholder.com/150",
        price: p.price,
        category: p.category,
      }));
      setDesigns(mapped);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingDesigns(false);
    }
  };

  // Fetch All Requests
  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await axios.get("https://localhost:44332/api/OutfitChangeRequest/GetAllRequests");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

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
        <h1 style={{ fontSize: "1rem", fontWeight: "900", letterSpacing: "-0.01em", marginBottom: "28px", color: "#fff" }}>Designer Admin</h1>
        <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", cursor: "pointer" }}>
          Dashboard
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "28px 24px", overflowY: "auto" }}>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#111", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Dashboard</h2>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>

          {/* My Designs Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaBox size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Design</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>{designs.length}</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Total Designs</div>
            <button
              onClick={() => {
                if (!showDesign) fetchDesigns();
                setShowDesign(!showDesign);
                setShowUserDetail(false);
                setShowAbout(false);
                setShowRequests(false);
              }}
              style={{ width: "100%", background: showDesign ? "#111" : "#f0f0f0", color: showDesign ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showDesign ? "Hide Designs" : "View Designs"}
            </button>
          </div>

          {/* About / Profile Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaUser size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Profile</span>
            </div>
            <div style={{ fontSize: "1rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>Designer Info</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Your Profile</div>
            <button
              onClick={() => {
                setShowAbout(!showAbout);
                setShowUserDetail(false);
                setShowDesign(false);
                setShowRequests(false);
              }}
              style={{ width: "100%", background: showAbout ? "#111" : "#f0f0f0", color: showAbout ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showAbout ? "Hide About Me" : "View About Me"}
            </button>
          </div>

          {/* Requests Card */}
          <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "38px", height: "38px", background: "#f0f0f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaEnvelope size={16} style={{ color: "#111" }} />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "3px 8px", borderRadius: "20px" }}>Requests</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "900", color: "#111", lineHeight: "1", marginBottom: "4px" }}>{requests.length}</div>
            <div style={{ fontSize: "11px", color: "#999", fontWeight: "600", marginBottom: "14px", letterSpacing: "0.04em" }}>Outfit Change Requests</div>
            <button
              onClick={() => {
                if (!showRequests) fetchRequests();
                setShowRequests(!showRequests);
                setShowUserDetail(false);
                setShowAbout(false);
                setShowDesign(false);
              }}
              style={{ width: "100%", background: showRequests ? "#111" : "#f0f0f0", color: showRequests ? "#fff" : "#111", border: "none", padding: "8px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
            >
              {showRequests ? "Hide Requests" : "View Requests"}
            </button>
          </div>

        </div>

        {/* My Designs List */}
        {showDesign && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>My Designs</h3>
              <span style={{ fontSize: "10px", fontWeight: "700", background: "#111", color: "#fff", padding: "3px 8px", borderRadius: "20px" }}>{designs.length} products</span>
            </div>

            {loadingDesigns ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "30px 0", gap: "10px" }}>
                <div style={{ width: "20px", height: "20px", border: "2px solid #eee", borderTop: "2px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span style={{ fontSize: "12px", color: "#999" }}>Loading designs...</span>
              </div>
            ) : designs.length === 0 ? (
              <p style={{ textAlign: "center", color: "#bbb", fontSize: "13px", padding: "20px 0" }}>No designs found.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
                {designs.map((d) => (
                  <div key={d.id} style={{ border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden", background: "#fafafa" }}>
                    <img src={d.img} alt={d.name} style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ fontSize: "12px", fontWeight: "700", color: "#111", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</p>
                      <p style={{ fontSize: "11px", fontWeight: "800", color: "#111", margin: "0 0 3px" }}>{formatPrice(d.price)}</p>
                      <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", background: "#f0f0f0", color: "#555", padding: "2px 6px", borderRadius: "20px" }}>{d.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* About Section */}
        {showAbout && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: "0 0 12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>About Me</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[["User ID", userId], ["Name", user?.userName || "—"], ["Email", user?.email || "—"], ["Role", user?.role || "Designer"]].map(([label, value]) => (
                <div key={label} style={{ display: "flex", gap: "12px", padding: "10px 14px", background: "#fafafa", borderRadius: "6px", border: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", minWidth: "60px", paddingTop: "1px" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#111" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests List */}
        {showRequests && (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #ececec", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "13px", fontWeight: "800", color: "#111", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Outfit Change Requests</h3>
              <span style={{ fontSize: "10px", fontWeight: "700", background: "#111", color: "#fff", padding: "3px 8px", borderRadius: "20px" }}>{requests.length} requests</span>
            </div>

            {loadingRequests ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "30px 0", gap: "10px" }}>
                <div style={{ width: "20px", height: "20px", border: "2px solid #eee", borderTop: "2px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <span style={{ fontSize: "12px", color: "#999" }}>Loading requests...</span>
              </div>
            ) : requests.length === 0 ? (
              <p style={{ textAlign: "center", color: "#bbb", fontSize: "13px", padding: "20px 0" }}>No requests found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {requests.map((r, i) => (
                  <div key={i} style={{ padding: "12px 16px", border: "1px solid #f0f0f0", borderRadius: "8px", background: "#fafafa" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "9px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "#111", padding: "3px 8px", borderRadius: "3px" }}>
                        Request #{i + 1}
                      </span>
                      {r.requestDate && (
                        <span style={{ fontSize: "10px", color: "#bbb", fontWeight: "500" }}>
                          {new Date(r.requestDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                      {[
                        ["Customer", r.yourName || r.name || "—"],
                        ["Phone", r.phoneNumber || r.phoneNumber || "—"],
                        ["Product", r.productName || "—"],
                        ["Discription", r.description || "—"],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div style={{ fontSize: "9px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1px" }}>{label}</div>
                          <div style={{ fontSize: "12px", fontWeight: "600", color: "#111" }}>{value}</div>
                        </div>
                      ))}
                    </div>
                    {(r.message || r.requestDetails) && (
                      <div style={{ marginTop: "8px", padding: "8px 10px", background: "#fff", border: "1px solid #ececec", borderRadius: "4px" }}>
                        <div style={{ fontSize: "9px", fontWeight: "700", color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>Message</div>
                        <p style={{ fontSize: "12px", color: "#555", margin: 0, lineHeight: "1.5" }}>{r.message || r.requestDetails}</p>
                      </div>
                    )}
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