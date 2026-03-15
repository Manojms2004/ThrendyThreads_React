import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FashionDesignerDashboard() {

  const [activePage, setActivePage] = useState("dashboard");
  const [designs, setDesigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [newDesign, setNewDesign] = useState({
    name: "",
    cost: "",
    quantity: "",
  });

  const [admins, setAdmins] = useState([]);

  const [showAdminForm, setShowAdminForm] = useState(false);

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

  const fetchDesigners = async () => {
  try {
    const res = await axios.get(
      "https://localhost:44332/api/Designer/GetAllDesigners"
    );

    const designers = res.data.map((d) => ({
      id: d.designerId,
      name: d.designerName,
      email: d.designerEmail,
      image: `data:image/jpeg;base64,${d.designerImage}`,
      about: d.aboutDesigner,
      phone: d.phoneNumber,
      address: d.address
    }));

    setAdmins(designers);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load designers");
  }
};

useEffect(() => {
  fetchDesigners();
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
    return designs.length > 0
      ? Math.max(...designs.map((d) => d.id)) + 1
      : 1;
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

      setNewAdmin((prev) => ({
        ...prev,
        image: base64
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAddAdmin = async () => {

    if (
      !newAdmin.userName ||
      !newAdmin.password ||
      !newAdmin.email ||
      !newAdmin.image ||
      !newAdmin.designerName ||
      !newAdmin.aboutDesigner ||
      !newAdmin.phoneNumber ||
      !newAdmin.address
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
        address: newAdmin.address
      };

      await axios.post(
        "https://localhost:44332/api/Registration/AddDesignerWithRegistration",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Designer added successfully");

      fetchDesigners();

      setNewAdmin({
        userName: "",
        password: "",
        email: "",
        image: "",
        designerName: "",
        aboutDesigner: "",
        phoneNumber: "",
        address: "",
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

      {/* ALL YOUR EXISTING UI CODE REMAINS EXACTLY THE SAME */}

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-8">Designer Admin</h1>

        <ul className="space-y-3">

          <li
            onClick={() => setActivePage("dashboard")}
            className="cursor-pointer p-2 rounded hover:bg-gray-800"
          >
            Dashboard
          </li>

          <li
            onClick={() => setActivePage("designs")}
            className="cursor-pointer p-2 rounded hover:bg-gray-800"
          >
            Designs
          </li>

          <li
            onClick={() => setActivePage("designers")}
            className="cursor-pointer p-2 rounded hover:bg-gray-800"
          >
            Designers
          </li>

        </ul>

      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            <div className="grid grid-cols-3 gap-6">

              <div className="bg-white border p-5 rounded-lg shadow-sm">
                <h3>Total Designs</h3>
                <p className="text-2xl font-bold">{designs.length}</p>
              </div>

              <div className="bg-white border p-5 rounded-lg shadow-sm">
                <h3>Total Quantity</h3>
                <p className="text-2xl font-bold">{totalQuantity}</p>
              </div>

              <div className="bg-white border p-5 rounded-lg shadow-sm">
                <h3>Total Designers</h3>
                <p className="text-2xl font-bold">{admins.length}</p>
              </div>

            </div>
          </>
        )}

        {/* Designers Page */}
        {activePage === "designers" && (
          <div>

            {/* Header Row */}
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

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  style={{ background: "#fff", border: "1px solid #ececec", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 10px rgba(0,0,0,0.07)", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 10px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >

                  {/* Image */}
                  <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "#f0f0f0" }}>
                    <img
                      src={admin.image}
                      alt={admin.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* Dark overlay at bottom */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
                    {/* Name on image */}
                    <h3 style={{ position: "absolute", bottom: "10px", left: "14px", color: "#fff", fontSize: "1rem", fontWeight: "800", margin: 0, letterSpacing: "-0.01em", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                      {admin.name}
                    </h3>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "14px 16px" }}>

                    {/* About */}
                    <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", margin: "0 0 12px" }}>
                      {admin.about}
                    </p>

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

              {/* Modal Header */}
              <div style={{ background: "#111", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>Add New Designer</h2>
                  <p style={{ fontSize: "11px", color: "#888", margin: "3px 0 0", letterSpacing: "0.06em", textTransform: "uppercase" }}>Fill in both sections below</p>
                </div>
                <button
                  onClick={() => setShowAdminForm(false)}
                  style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ overflowY: "auto", padding: "24px 28px", flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                  {/* Left — User Info */}
                  <div style={{ border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ background: "#f7f7f7", padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>User Information</span>
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>User Name</label>
                        <input
                          type="text" placeholder="Enter user name"
                          value={newAdmin.userName}
                          onChange={(e) => setNewAdmin({ ...newAdmin, userName: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Password</label>
                        <input
                          type="password" placeholder="Enter password"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Email</label>
                        <input
                          type="email" placeholder="Enter email"
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Profile Image</label>
                        <input
                          type="file" accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "12px", color: "#555", outline: "none", boxSizing: "border-box", cursor: "pointer" }}
                        />
                        {newAdmin.image && (
                          <img
                            src={`data:image/png;base64,${newAdmin.image}`}
                            alt="Preview"
                            style={{ marginTop: "10px", width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "2px solid #111", display: "block" }}
                          />
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Right — Designer Info */}
                  <div style={{ border: "1px solid #ececec", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ background: "#f7f7f7", padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>Designer Details</span>
                    </div>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Designer Name</label>
                        <input
                          type="text" placeholder="Enter designer name"
                          value={newAdmin.designerName}
                          onChange={(e) => setNewAdmin({ ...newAdmin, designerName: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

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

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Phone Number</label>
                        <input
                          type="text" placeholder="Enter phone number"
                          value={newAdmin.phoneNumber}
                          onChange={(e) => setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "5px" }}>Address</label>
                        <input
                          type="text" placeholder="Enter address"
                          value={newAdmin.address}
                          onChange={(e) => setNewAdmin({ ...newAdmin, address: e.target.value })}
                          style={{ width: "100%", border: "1.5px solid #ddd", borderRadius: "4px", padding: "9px 12px", fontSize: "13px", color: "#111", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: "16px 28px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: "10px", flexShrink: 0, background: "#fafafa" }}>
                <button
                  onClick={() => setShowAdminForm(false)}
                  style={{ background: "#fff", color: "#111", border: "2px solid #ccc", padding: "10px 22px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  style={{ background: "#111", color: "#fff", border: "2px solid #111", padding: "10px 28px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}