// src/Components/AdminDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";
import { allProducts as initialProductsFromFile } from "./ProductsData";

/**
 * AdminDashboard
 * - Persists to localStorage (admin_products_v1)
 * - Add / Edit / Delete, search, stats, pagination, export CSV
 */

export default function AdminDashboard() {
  const STORAGE_KEY = "admin_products_v1";

  const safeParse = (raw) => {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn("AdminDashboard: failed to parse localStorage data, resetting", e);
      return null;
    }
  };

  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = safeParse(raw);
        if (parsed && Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("AdminDashboard init localStorage read error", e);
    }
    // copy initialProducts to prevent accidental mutation
    return initialProductsFromFile.map((p) => ({ ...p }));
  });

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null => adding
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const [form, setForm] = useState({
    id: null,
    name: "",
    img: "",
    price: "",
    oldPrice: "",
    discount: "",
    finalPrice: "",
    rating: "",
    reviews: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn("AdminDashboard: failed to save to localStorage", e);
    }
  }, [products]);

  useEffect(() => {
    console.log("AdminDashboard mounted — products:", products.length);
  }, []);

  const categories = useMemo(() => ["all", "cotton", "banarasi", "wedding"], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || (p.id + "").includes(q);
    });

    if (categoryFilter !== "all") {
      if (categoryFilter === "cotton") list = list.filter((p) => p.id <= 10);
      if (categoryFilter === "banarasi") list = list.filter((p) => p.id >= 11 && p.id <= 20);
      if (categoryFilter === "wedding") list = list.filter((p) => p.id >= 21);
    }

    return list;
  }, [products, query, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const stats = {
    totalProducts: products.length,
    avgRating:
      products.length === 0
        ? 0
        : (products.reduce((s, p) => s + (parseFloat(p.rating) || 0), 0) / products.length).toFixed(2),
    totalReviews: products.reduce((s, p) => s + (parseInt(p.reviews, 10) || 0), 0),
  };

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditingProduct(null);
    setForm({
      id: null,
      name: "",
      img: "/placeholder.png",
      price: "",
      oldPrice: "",
      discount: "",
      finalPrice: "",
      rating: "",
      reviews: "",
    });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p.id);
    setForm({
      id: p.id,
      name: p.name || "",
      img: p.img || "/placeholder.png",
      price: p.price ?? "",
      oldPrice: p.oldPrice ?? "",
      discount: p.discount ?? "",
      finalPrice: p.finalPrice ?? "",
      rating: p.rating ?? "",
      reviews: p.reviews ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.finalPrice) {
      alert("Please provide at least a name and finalPrice.");
      return;
    }

    if (editingProduct == null) {
      const nextId = products.reduce((mx, p) => Math.max(mx, p.id), 0) + 1;
      const newProd = {
        id: nextId,
        name: form.name,
        img: form.img,
        price: form.price ? Number(form.price) : null,
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        discount: form.discount || null,
        finalPrice: form.finalPrice ? Number(form.finalPrice) : null,
        rating: form.rating ? Number(form.rating) : null,
        reviews: form.reviews ? Number(form.reviews) : null,
      };
      setProducts((s) => [newProd, ...s]);
    } else {
      setProducts((s) =>
        s.map((p) =>
          p.id === editingProduct
            ? {
                ...p,
                name: form.name,
                img: form.img,
                price: form.price ? Number(form.price) : null,
                oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
                discount: form.discount || null,
                finalPrice: form.finalPrice ? Number(form.finalPrice) : null,
                rating: form.rating ? Number(form.rating) : null,
                reviews: form.reviews ? Number(form.reviews) : null,
              }
            : p
        )
      );
    }

    closeForm();
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) return;
    setProducts((s) => s.filter((p) => p.id !== id));
  };

  const exportCSV = () => {
    const keys = ["id", "name", "price", "oldPrice", "discount", "finalPrice", "rating", "reviews", "img"];
    const rows = [keys.join(",")].concat(
      products.map((p) =>
        keys
          .map((k) => {
            let val = p[k];
            if (val == null) return "";
            if (typeof val === "string" && (val.includes(",") || val.includes('"'))) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
          })
          .join(",")
      )
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded px-3 py-1 gap-2">
            <FaSearch />
            <input
              className="bg-transparent outline-none text-sm"
              placeholder="Search by name or id"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2 text-gray-500">
                <FaTimes />
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </select>

          <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded">
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <div className="text-sm text-gray-500">Average Rating</div>
          <div className="text-2xl font-bold">{stats.avgRating}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <div className="text-sm text-gray-500">Total Reviews</div>
          <div className="text-2xl font-bold">{stats.totalReviews}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-3 py-2 text-sm">ID</th>
              <th className="px-3 py-2 text-sm">Preview</th>
              <th className="px-3 py-2 text-sm">Name</th>
              <th className="px-3 py-2 text-sm">Price</th>
              <th className="px-3 py-2 text-sm">Final</th>
              <th className="px-3 py-2 text-sm">Rating</th>
              <th className="px-3 py-2 text-sm">Reviews</th>
              <th className="px-3 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-3 py-3 text-sm align-top">{p.id}</td>
                <td className="px-3 py-3">
                  <img src={p.img || "/placeholder.png"} alt={p.name} className="w-20 h-20 object-cover rounded" />
                </td>
                <td className="px-3 py-3 text-sm">{p.name}</td>
                <td className="px-3 py-3 text-sm">₹{p.price ?? "-"}</td>
                <td className="px-3 py-3 text-sm font-semibold">₹{p.finalPrice ?? "-"}</td>
                <td className="px-3 py-3 text-sm">{p.rating ?? "-"}</td>
                <td className="px-3 py-3 text-sm">{p.reviews ?? "-"}</td>
                <td className="px-3 py-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex items-center gap-2 px-2 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="flex items-center gap-2 px-2 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="px-3 py-1">
            Page {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">{filtered.length} result(s)</div>
          <button onClick={exportCSV} className="px-3 py-2 border rounded">
            Export CSV
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeForm}></div>
          <form onSubmit={saveProduct} className="relative z-50 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingProduct == null ? "Add Product" : `Edit Product #${editingProduct}`}
              </h3>
              <button type="button" onClick={closeForm} className="text-gray-600">
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Name</label>
                <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Image path (relative)</label>
                <input name="img" value={form.img} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Price</label>
                <input name="price" value={form.price} onChange={handleFormChange} type="number" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Old Price</label>
                <input name="oldPrice" value={form.oldPrice} onChange={handleFormChange} type="number" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Final Price</label>
                <input name="finalPrice" value={form.finalPrice} onChange={handleFormChange} type="number" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Discount text</label>
                <input name="discount" value={form.discount} onChange={handleFormChange} placeholder="e.g. 20% OFF" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Rating</label>
                <input name="rating" value={form.rating} onChange={handleFormChange} type="number" step="0.1" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="text-sm">Reviews</label>
                <input name="reviews" value={form.reviews} onChange={handleFormChange} type="number" className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={closeForm} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                {editingProduct == null ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}