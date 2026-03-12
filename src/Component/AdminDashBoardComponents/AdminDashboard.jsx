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
          <>

            <h2 className="text-2xl font-bold mb-4">Designer Members</h2>

            <button
              onClick={() => setShowAdminForm(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4 cursor-pointer"
            >
              Add Designer
            </button>

            <div className="grid grid-cols-3 gap-6">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
                >

                  {/* Image */}
                  <img
                    src={admin.image}
                    alt={admin.name}
                    className="w-full h-40 object-cover rounded"
                  />

                  {/* Name */}
                  <h3 className="text-xl font-bold mt-3">{admin.name}</h3>

                  {/* About */}
                  <p className="text-gray-600 text-sm mt-1">
                    {admin.about}
                  </p>

                  {/* Details */}
                  <div className="text-sm mt-3 space-y-1">
                    <p><strong>Email:</strong> {admin.email}</p>
                    <p><strong>Phone:</strong> {admin.phone}</p>
                    <p><strong>Address:</strong> {admin.address}</p>
                  </div>

                </div>
              ))}
            </div>

          </>
        )}

        {/* Add Admin Modal */}
        {showAdminForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-lg shadow-xl w-96">

              <h3 className="text-xl font-bold mb-4">Add Designer</h3>

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

              <div className="flex justify-end gap-2 mt-3">

                <button
                  onClick={() => setShowAdminForm(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddAdmin}
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
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