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
    { id: 1, name: "Ritu Kumar" },
    { id: 2, name: "Anitha Dangore" },
    { id: 3, name: "Neetu Lulla" },
    { id: 4, name: "Rohit Bal" },
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
    <div className="flex h-screen bg-purple-50">
 
      <aside className="w-64 bg-gradient-to-b from-purple-200 to-purple-300 p-5">
 
        <h1 className="text-2xl font-bold mb-8">Fashion Designer Admin</h1>
 
        <ul className="space-y-4">
 
          <li
            onClick={() => setActivePage("dashboard")}
            className="cursor-pointer hover:bg-purple-400 hover:text-white p-2 rounded"
          >
            Dashboard
          </li>
 
          <li
            onClick={() => setActivePage("designs")}
            className="cursor-pointer hover:bg-purple-400 hover:text-white p-2 rounded"
          >
            Designs
          </li>
 
          <li
            onClick={() => setActivePage("designers")}
            className="cursor-pointer hover:bg-purple-400 hover:text-white p-2 rounded"
          >
            Designers
          </li>
 
        </ul>
 
      </aside>
 
      <main className="flex-1 p-6 overflow-y-auto">
 
        {activePage === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">
              Dashboard
            </h2>
 
            <div className="grid grid-cols-3 gap-6">
 
              <div className="bg-white p-5 rounded shadow">
                <h3>Total Designs</h3>
                <p className="text-2xl font-bold">{designs.length}</p>
              </div>
 
              <div className="bg-white p-5 rounded shadow">
                <h3>Total Quantity</h3>
                <p className="text-2xl font-bold">{totalQuantity}</p>
              </div>
 
              <div className="bg-white p-5 rounded shadow">
                <h3>Total Admins</h3>
                <p className="text-2xl font-bold">{admins.length}</p>
              </div>
 
            </div>
          </>
        )}
 
        {activePage === "designers" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Admin Members</h2>
 
            <button
              onClick={() => setShowAdminForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
            >
              Admin Login
            </button>
 
            <ul className="space-y-2">
              {admins.map((admin) => (
                <li key={admin.id} className="bg-white p-2 rounded shadow">
                  {admin.name}
                </li>
              ))}
            </ul>
          </>
        )}
 
        {showAdminForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
 
            <div className="bg-white p-6 rounded w-96">
 
              <h3 className="text-xl font-bold mb-4">Add Admin</h3>
 
              <input
                type="text"
                placeholder="Designer ID"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.id}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, id: e.target.value })
                }
              />
 
              <input
                type="text"
                placeholder="Designer Name"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
              />
 
              <input
                type="email"
                placeholder="Designer Email"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
 
              <textarea
                placeholder="About Designer"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.about}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, about: e.target.value })
                }
              />
 
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.phone}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, phone: e.target.value })
                }
              />
 
              <input
                type="text"
                placeholder="Address"
                className="w-full border p-2 mb-2 rounded"
                value={newAdmin.address}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, address: e.target.value })
                }
              />
 
              <div className="flex justify-end gap-2">
 
                <button
                  onClick={() => setShowAdminForm(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>
 
                <button
                  onClick={handleAddAdmin}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
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