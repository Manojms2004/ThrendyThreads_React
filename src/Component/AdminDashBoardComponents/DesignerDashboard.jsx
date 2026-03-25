import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
export default function DesignerDashBoard() {

  const [designs, setDesigns] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showDesign, setShowDesign] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:44332/api/Registration/GetUsers");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();

    setDesigns([
      { id: 1, name: "Lehenga" },
      { id: 2, name: "Saree" }
    ]);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <button
                   onClick={() => navigate("/home")}
                   style={{
                     position: "fixed",       // ✅ FIXED POSITION
                     bottom: "20px",             // distance from top
                     left: "20px",            // distance from left
                     zIndex: 1000,            // stay above all content
                     display: "inline-flex",
                     alignItems: "center",
                     gap: "6px",
                     background: "#111",
                     color: "#fff",
                     border: "none",
                     padding: "7px 14px",
                     borderRadius: "4px",
                     fontSize: "12px",
                     fontWeight: "600",
                     cursor: "pointer",
                     letterSpacing: "0.05em",
                     width: "fit-content"
                   }}
                 >
                   <FaArrowLeft size={10} /> Back
                 </button>
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Designer Admin</h1>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">

        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-5">

          {/* Add Design */}
          <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="bg-gray-100 p-2 rounded">➕</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Design</span>
            </div>

            <p className="text-3xl font-bold">{designs.length}</p>
            <p className="text-gray-500 text-sm">Total Designs</p>

            <button
              onClick={() => {
                setShowDesign(!showDesign);
                setShowUserDetail(false);
                setShowAbout(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded hover:bg-gray-200"
            >
              {showDesign ? "Hide Design" : "Add Design"}
            </button>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="bg-gray-100 p-2 rounded">👤</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Profile</span>
            </div>

            <p className="text-lg font-bold">Designer Info</p>

            <button
              onClick={() => {
                setShowAbout(!showAbout);
                setShowUserDetail(false);
                setShowDesign(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded"
            >
              {showAbout ? "Hide About Me" : "View About Me"}
            </button>
          </div>

          {/* Customers */}
          <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="bg-gray-100 p-2 rounded">👥</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">Users</span>
            </div>

            <p className="text-3xl font-bold">{users.length}</p>

            <button
              onClick={() => {
                setShowUserDetail(!showUserDetail);
                setShowAbout(false);
                setShowDesign(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded"
            >
              {showUserDetail ? "Hide Customers" : "View Customers"}
            </button>
          </div>

        </div>

        {/* ABOUT SECTION */}
        {showAbout && (
          <div className="mt-6 bg-white p-5 rounded shadow">
            <h3>About Me</h3>
            <p>This is your profile section.</p>
          </div>
        )}

        {/* CUSTOMER LIST */}
        {showUserDetail && (
          <div className="mt-6 bg-white p-5 rounded shadow">
            <h3>Customers</h3>

            {users.map((u, i) => (
              <div key={i} className="border-b py-2">
                <p>{u.userName}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}