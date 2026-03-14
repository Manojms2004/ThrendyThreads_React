import { useState, useEffect } from "react";

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

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Ritu Kumar",
      email: "ritu@gmail.com",
      about: "Famous Indian fashion designer known for bridal wear.",
      phone: "9876543210",
      address: "Delhi, India",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 2,
      name: "Anita Dongre",
      email: "anita@gmail.com",
      about: "Popular designer specializing in luxury fashion.",
      phone: "9876543211",
      address: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      id: 3,
      name: "Neeta Lulla",
      email: "neeta@gmail.com",
      about: "Award winning designer known for Bollywood costumes.",
      phone: "9876543212",
      address: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 4,
      name: "Rohit Bal",
      email: "rohit@gmail.com",
      about: "Luxury designer famous for traditional designs.",
      phone: "9876543213",
      address: "Delhi, India",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ]);

  const [showAdminForm, setShowAdminForm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    id: "",
    name: "",
    email: "",
    about: "",
    phone: "",
    address: "",
  });

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

  const handleDeleteDesign = (id) => {
    if (window.confirm("Delete this design?")) {
      setDesigns(designs.filter((d) => d.id !== id));
    }
  };

  const handleEditDesign = (design) => {
    setNewDesign(design);
    setEditingId(design.id);
    setShowModal(true);
  };

  const resetDesignForm = () => {
    setNewDesign({ name: "", cost: "", quantity: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const filteredDesigns = designs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalQuantity = designs.reduce((sum, d) => sum + d.quantity, 0);

  const handleAddAdmin = () => {

    if (
      !newAdmin.id ||
      !newAdmin.name ||
      !newAdmin.email ||
      !newAdmin.about ||
      !newAdmin.phone ||
      !newAdmin.address
    ) {
      alert("Please fill all the fields");
      return;
    }

    const adminData = {
      id: newAdmin.id,
      name: newAdmin.name,
    };

    setAdmins([...admins, adminData]);

    alert("Designer added successfully");

    setNewAdmin({
      id: "",
      name: "",
      email: "",
      about: "",
      phone: "",
      address: "",
    });

    setShowAdminForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">

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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-bold mb-6 text-center">Add New Designer</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* User Info Section */}
                <div className="space-y-4 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">User Information</h3>

                  <div>
                    <label className="block text-sm font-medium mb-1">User Name</label>
                    <input
                      type="text"
                      placeholder="Enter user name"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.userName}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, userName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, password: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.email}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full border p-3 rounded-lg"
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, image: e.target.files[0] })
                      }
                    />
                    {newAdmin.image && (
                      <img
                        src={URL.createObjectURL(newAdmin.image)}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-lg border shadow-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Designer Info Section */}
                <div className="space-y-4 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Designer Details</h3>

                  <div>
                    <label className="block text-sm font-medium mb-1">Designer Name</label>
                    <input
                      type="text"
                      placeholder="Enter designer name"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.designerName}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, designerName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">About Designer</label>
                    <textarea
                      placeholder="Describe the designer"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.aboutDesigner}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, aboutDesigner: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.phoneNumber}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, phoneNumber: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      value={newAdmin.address}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAdminForm(false)}
                  className="px-6 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="px-6 py-2 rounded-lg bg-black cursor-pointer text-white font-semibold hover:bg-black-700 transition"
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