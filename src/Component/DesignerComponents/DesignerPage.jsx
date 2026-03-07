// src/Components/RituDesigner.jsx
import React, { useState } from "react";
import ShopByOccasion from "../ShopByOccasion";

export default function RituDesigner({ wishlist, toggleWishlist }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [extraProducts, setExtraProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    price: "",
    category: "cotton",
  });

  const handleAddPro = () => {
    setIsAdmin(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.img || !formData.price) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      img: formData.img,
      finalPrice: Number(formData.price),
      rating: 4.5,
      reviews: 1,
      category: formData.category,
      designer: "ritu",
    };

    setExtraProducts([...extraProducts, newProduct]);

    setFormData({
      name: "",
      img: "",
      price: "",
      category: "cotton",
    });

    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Designer Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">

        <div className="w-full md:w-2/7">
          <img
            src="https://images.pexels.com/photos/5692479/pexels-photo-5692479.jpeg"
            alt="Ritu Designer"
            className="rounded-2xl shadow-xl border-4 border-gray-200"
          />
        </div>

        <div className="w-full md:w-2/3 space-y-6">

          {/* Designer Name */}
          <h1 className="text-4xl font-bold text-gray-900">
            Ritu Kumar
          </h1>

          {/* Tagline */}
          <p className="text-lg text-gray-600 ">
            Pioneer of Indian Couture & Traditional Textile Revival
          </p>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed">
            <b>Ritu Kumar</b> is one of India's most celebrated fashion designers,
            known for reviving traditional Indian textiles and craftsmanship.
            Since the late 1960s, she has played a major role in bringing
            ancient embroidery techniques and handwoven fabrics back into
            the world of contemporary fashion.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Her collections beautifully blend heritage embroidery,
            hand block printing, and luxurious fabrics with modern
            silhouettes. From bridal couture to contemporary festive wear,
            her designs reflect elegance, sustainability, and timeless artistry.
          </p>

          {/* Highlights Section */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Designer Highlights
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Over 50 years of contribution to Indian fashion.</li>
              <li>Known for reviving traditional embroidery and handloom fabrics.</li>
              <li>Collections featured in international fashion shows.</li>
              <li>Designed bridal wear, couture, and festive collections.</li>
              <li>Advocate for sustainable and handcrafted fashion.</li>
            </ul>
          </div>

          {/* Button */}
          <button
            onClick={handleAddPro}
            className="mt-4 px-6 py-2 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Add Design
          </button>

        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative space-y-4">

            <h2 className="text-xl font-semibold">
              Add New Product
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  img: URL.createObjectURL(e.target.files[0]),
                })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="cotton">Cotton</option>
              <option value="banarasi">Banarasi</option>
              <option value="wedding">Wedding</option>
            </select>

            <div className="flex justify-between pt-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Close
              </button>

              <button
                onClick={handleAddProduct}
                className="px-6 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
              >
                Add Product
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Products Section */}
      <ShopByOccasion
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        extraProducts={extraProducts}
        designer="ritu"
      />

    </div>
  );
}