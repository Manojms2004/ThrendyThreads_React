import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashBoard() {

  const [activePage, setActivePage] = useState("dashboard");
  const [designs, setDesigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showUserDetail, setShowUserDetail] = useState(false);
  // Add these two states alongside showUserDetail
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showDesignerDetail, setShowDesignerDetail] = useState(false);

  const [newDesign, setNewDesign] = useState({
    name: "",
    cost: "",
    quantity: "",
  });

  const [admins, setAdmins] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);

  // ── NEW STATE for 3 APIs ──
  const [users, setUsers] = useState([]);
  const [designersList, setDesignersList] = useState([]);
  const [products, setProducts] = useState([]);

  const [newAdmin, setNewAdmin] = useState({
    userName: "",
    password: "",
    email: "",
    image: "",
    designerName: "",
    aboutDesigner: "",
    phoneNumber: "",
    address: "",
  });

  // ── FETCH 3 APIs ──
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Registration/GetUsers");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const fetchDesignersList = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Registration/GetDesigners");
      setDesignersList(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load designers list");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Product/GetAllProducts");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  };

  const fetchDesigners = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Designer/GetAllDesigners");
      const designers = res.data.map((d) => ({
        id: d.designerId,
        name: d.designerName,
        email: d.designerEmail,
        image: `data:image/jpeg;base64,${d.designerImage}`,
        about: d.aboutDesigner,
        phone: d.phoneNumber,
        address: d.address,
      }));
      setAdmins(designers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load designers");
    }
  };

  useEffect(() => {
    fetchDesigners();
    fetchUsers();
    fetchDesignersList();
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedDesigns = localStorage.getItem("designs");
    if (savedDesigns) {
      setDesigns(JSON.parse(savedDesigns));
    } else {
      setDesigns([
        { id: 1, name: "Bridal Lehenga", cost: 25000, quantity: 5 },
        { id: 2, name: "Designer Saree", cost: 15000, quantity: 10 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("designs", JSON.stringify(designs));
  }, [designs]);

  const generateId = () => {
    return designs.length > 0 ? Math.max(...designs.map((d) => d.id)) + 1 : 1;
  };

  const handleAddOrEditDesign = () => {
    if (!newDesign.name || !newDesign.cost || !newDesign.quantity) {
      alert("Please fill all fields");
      return;
    }
    const designData = {
      id: editingId ? editingId : generateId(),
      name: newDesign.name,
      cost: Number(newDesign.cost),
      quantity: Number(newDesign.quantity),
    };
    if (editingId) {
      setDesigns(designs.map((d) => (d.id === editingId ? designData : d)));
    } else {
      setDesigns([...designs, designData]);
    }
    resetDesignForm();
  };

  const resetDesignForm = () => {
    setNewDesign({ name: "", cost: "", quantity: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const totalQuantity = designs.reduce((sum, d) => sum + d.quantity, 0);

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setNewAdmin((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddAdmin = async () => {
    if (
      !newAdmin.userName || !newAdmin.password || !newAdmin.email ||
      !newAdmin.image || !newAdmin.designerName || !newAdmin.aboutDesigner ||
      !newAdmin.phoneNumber || !newAdmin.address
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const payload = {
        userName: newAdmin.userName,
        password: newAdmin.password,
        email: newAdmin.email,
        image: newAdmin.image,
        designerName: newAdmin.designerName,
        aboutDesigner: newAdmin.aboutDesigner,
        phoneNumber: newAdmin.phoneNumber,
        address: newAdmin.address,
      };
      await axios.post(
        "https://localhost:44332/api/Registration/AddDesignerWithRegistration",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Designer added successfully");
      fetchDesigners();
      setNewAdmin({
        userName: "", password: "", email: "", image: "",
        designerName: "", aboutDesigner: "", phoneNumber: "", address: "",
      });
      setShowAdminForm(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add designer");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">User DashBoard</h1>
        <ul className="space-y-3">
          <li onClick={() => setActivePage("dashboard")} className="cursor-pointer p-2 rounded hover:bg-gray-800">Dashboard</li>
          {/* <li onClick={() => setActivePage("designs")} className="cursor-pointer p-2 rounded hover:bg-gray-800">Designs</li> */}
          <li onClick={() => setActivePage("designers")} className="cursor-pointer p-2 rounded hover:bg-gray-800">Designers</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">

        {activePage === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            <div className="grid grid-cols-3 gap-5">

              {/* Users Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-md">Active</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-gray-900">{users.length}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Total Users</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserDetail(prev => !prev);
                    setShowProductDetail(false);
                    setShowDesignerDetail(false);
                  }}
                  className="w-full py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {showUserDetail ? "Hide Users" : "View Users"}
                </button>
              </div>

              {/* Products Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <path d="M16 8h4l3 4v4h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-md">In Stock</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-gray-900">{products.length}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Total Products</p>
                </div>
                <button
                  onClick={() => {
                    setShowProductDetail(prev => !prev);
                    setShowUserDetail(false);
                    setShowDesignerDetail(false);
                  }}
                  className="w-full py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {showProductDetail ? "Hide Products" : "View Products"}
                </button>
              </div>

              {/* Designers Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-md">Team</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-gray-900">{designersList.length}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Total Designers</p>
                </div>
                <button
                  onClick={() => {
                    setShowDesignerDetail(prev => !prev);
                    setShowUserDetail(false);
                    setShowProductDetail(false);
                  }}
                  className="w-full py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {showDesignerDetail ? "Hide Designers" : "View Designers"}
                </button>
              </div>

            </div>

            {/* ── USER DETAIL PANEL ── */}
            {showUserDetail && (
              <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">User Overview</p>
                  <span className="text-xs text-gray-400">{users.length} total</span>
                </div>
                <div className="grid grid-cols-4 gap-3 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-xs font-medium text-gray-500">Email</p>
                  <p className="text-xs font-medium text-gray-500">Role</p>
                  <p className="text-xs font-medium text-gray-500">Status</p>
                </div>
                <div className="overflow-y-auto max-h-72 flex flex-col gap-1 pr-1">
                  {users.map((user, index) => (
                    <div
                      key={user.userId || user.id || index}
                      className="grid grid-cols-4 gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        {user.image ? (
                          <img
                            src={`data:image/jpeg;base64,${user.image}`}
                            alt={user.userName}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-white">
                              {(user.userName || "U").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="text-sm text-gray-800 truncate">{user.userName || "Unknown"}</span>
                      </div>
                      <span className="text-sm text-gray-500 truncate">{user.email || "—"}</span>
                      <span className="text-sm text-gray-600 truncate">{user.role || "User"}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${user.isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Showing {users.length} users</p>
                  <button className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors">
                    Full User Report
                  </button>
                </div>
              </div>
            )}

            {/* ── PRODUCT DETAIL PANEL ── */}
            {showProductDetail && (
              <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">Product Overview</p>
                  <span className="text-xs text-gray-400">{products.length} total</span>
                </div>
                <div className="grid grid-cols-4 gap-3 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                  <p className="text-xs font-medium text-gray-500">Product</p>
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-xs font-medium text-gray-500">Price</p>
                  <p className="text-xs font-medium text-gray-500">Quantity</p>
                </div>
                <div className="overflow-y-auto max-h-72 flex flex-col gap-1 pr-1">
                  {products.map((product, index) => (
                    <div
                      key={product.productId || product.id || index}
                      className="grid grid-cols-4 gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      {/* Image */}
                      <div className="flex items-center">
                        {product.image || product.productImage ? (
                          <img
                            src={`data:image/jpeg;base64,${product.image || product.productImage}`}
                            alt={product.name || product.productName}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Name */}
                      <span className="text-sm text-gray-800 truncate">
                        {product.name || product.productName || "—"}
                      </span>
                      {/* Price */}
                      <span className="text-sm text-gray-600 truncate">
                        ₹{product.cost || product.price || product.productPrice || "—"}
                      </span>
                      {/* Quantity */}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit bg-gray-100 text-gray-700">
                        Qty: {product.quantity || product.productQuantity || 0}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Showing {products.length} products</p>
                  <button className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors">
                    Full Product Report
                  </button>
                </div>
              </div>
            )}

            {/* ── DESIGNER DETAIL PANEL ── */}
            {showDesignerDetail && (
              <div className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">Designer Overview</p>
                  <span className="text-xs text-gray-400">{designersList.length} total</span>
                </div>
                <div className="grid grid-cols-4 gap-3 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                  <p className="text-xs font-medium text-gray-500">Designer</p>
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-xs font-medium text-gray-500">Email</p>
                  <p className="text-xs font-medium text-gray-500">Phone</p>
                </div>
                <div className="overflow-y-auto max-h-72 flex flex-col gap-1 pr-1">
                  {designersList.map((designer, index) => (
                    <div
                      key={designer.designerId || designer.id || index}
                      className="grid grid-cols-4 gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      {/* Image */}
                      <div className="flex items-center">
                        {designer.image || designer.designerImage ? (
                          <img
                            src={`data:image/jpeg;base64,${designer.image || designer.designerImage}`}
                            alt={designer.name || designer.userName}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-white">
                              {(designer.name || designer.userName || "D").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Name */}
                      <span className="text-sm text-gray-800 truncate">
                        {designer.name || designer.userName || "—"}
                      </span>
                      {/* Email */}
                      <span className="text-sm text-gray-500 truncate">
                        {designer.email || designer.email || "—"}
                      </span>
                      {/* Phone */}
                      <span className="text-sm text-gray-600 truncate">
                        {designer.phone || designer.phoneNumber || "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Showing {designersList.length} designers</p>
                  <button className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors">
                    Full Designer Report
                  </button>
                </div>
              </div>
            )}

          </>
        )}

        {/* Designers Page */}
        {activePage === "designers" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  Designer Members
                </h2>
                <div style={{ width: "40px", height: "3px", background: "#111", borderRadius: "2px" }} />
              </div>
              <button
                onClick={() => setShowAdminForm(true)}
                style={{ background: "#111", color: "#fff", border: "2px solid #111", padding: "10px 20px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
              >
                + Add Designer
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 10px rgba(0,0,0,0.07)", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 10px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "#f0f0f0" }}>
                    <img src={admin.image} alt={admin.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
                    <h3 style={{ position: "absolute", bottom: "10px", left: "14px", color: "#fff", fontSize: "1rem", fontWeight: "800", margin: 0, letterSpacing: "-0.01em", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                      {admin.name}
                    </h3>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", margin: "0 0 12px" }}>{admin.about}</p>
                    <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
                      <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", minWidth: "52px", paddingTop: "1px" }}>Email</span>
                        <span style={{ fontSize: "12px", color: "#222", fontWeight: "500" }}>{admin.email}</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", minWidth: "52px", paddingTop: "1px" }}>Phone</span>
                        <span style={{ fontSize: "12px", color: "#222", fontWeight: "500" }}>{admin.phone}</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", minWidth: "52px", paddingTop: "1px" }}>Address</span>
                        <span style={{ fontSize: "12px", color: "#222", fontWeight: "500" }}>{admin.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAdminForm && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "16px" }}>
            <div style={{ background: "#fff", width: "100%", maxWidth: "820px", borderRadius: "12px", boxShadow: "0 12px 60px rgba(0,0,0,0.25)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>

              <div style={{ background: "#111", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>Add New Designer</h2>
                  <p style={{ fontSize: "11px", color: "#888", margin: "3px 0 0", letterSpacing: "0.06em", textTransform: "uppercase" }}>Fill in both sections below</p>
                </div>
                <button onClick={() => setShowAdminForm(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>

              <div style={{ overflowY: "auto", padding: "24px 28px", flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                  <div style={{ border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ background: "#f7f7f7", padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>User Information</span>
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        { label: "User Name", key: "userName", type: "text", placeholder: "Enter user name" },
                        { label: "Password", key: "password", type: "password", placeholder: "Enter password" },
                        { label: "Email", key: "email", type: "email", placeholder: "Enter email" },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>{label}</label>
                          <input
                            type={type} placeholder={placeholder}
                            value={newAdmin[key]}
                            onChange={(e) => setNewAdmin({ ...newAdmin, [key]: e.target.value })}
                            style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                          />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Profile Image</label>
                        <input
                          type="file" accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "12px", color: "#555", outline: "none", boxSizing: "border-box", cursor: "pointer" }}
                        />
                        {newAdmin.image && (
                          <img src={`data:image/png;base64,${newAdmin.image}`} alt="Preview" style={{ marginTop: "10px", width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "2px solid #111", display: "block" }} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ background: "#f7f7f7", padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>Designer Details</span>
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        { label: "Designer Name", key: "designerName", type: "text", placeholder: "Enter designer name" },
                        { label: "Phone Number", key: "phoneNumber", type: "text", placeholder: "Enter phone number" },
                        { label: "Address", key: "address", type: "text", placeholder: "Enter address" },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>{label}</label>
                          <input
                            type={type} placeholder={placeholder}
                            value={newAdmin[key]}
                            onChange={(e) => setNewAdmin({ ...newAdmin, [key]: e.target.value })}
                            style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                          />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>About Designer</label>
                        <textarea
                          placeholder="Describe the designer..."
                          value={newAdmin.aboutDesigner}
                          onChange={(e) => setNewAdmin({ ...newAdmin, aboutDesigner: e.target.value })}
                          rows={4}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ padding: "16px 28px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: "10px", flexShrink: 0, background: "#fafafa" }}>
                <button onClick={() => setShowAdminForm(false)} style={{ background: "#fff", color: "#111", border: "2px solid #ccc", padding: "10px 22px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                <button onClick={handleAddAdmin} style={{ background: "#111", color: "#fff", border: "2px solid #111", padding: "10px 28px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}