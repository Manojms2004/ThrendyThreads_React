import React, { useState } from "react";

function Contect({ onClose }) {
  const [mobile, setMobile] = useState("");
  const [notify, setNotify] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mobile: ${mobile}, Notify: ${notify}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative w-[400px] shadow-lg">
        <button
          type="button"
          className="absolute top-3 right-3 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">TrendyThreads</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 border rounded-md overflow-hidden">
            <span className="bg-gray-200 px-3 py-2 border-r">+91</span>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <label className="block text-sm mb-4">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="mr-2"
            />
            Notify me with offers & updates
          </label>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contect;
