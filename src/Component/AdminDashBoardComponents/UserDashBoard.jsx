import { useState, useEffect } from "react";
import axios from "axios";
 
export default function UserDashBoard() {
 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
 
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
 
  // Fetch Products
  useEffect(() => {
    axios.get("https://localhost:44332/api/Product/GetAllProducts")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);
 
  // Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
 
  // Add to Favorites
  const addToFavorites = (product) => {
    setFavorites([...favorites, product]);
  };
 
  return (
<div className="flex h-screen bg-gray-100">
 
      {/* Sidebar */}
<aside className="w-64 bg-black text-white p-6">
<h1 className="text-2xl font-bold mb-8">User Dashboard</h1>
<ul className="space-y-3">
<li className="p-2 hover:bg-gray-800 rounded cursor-pointer">Dashboard</li>
</ul>
</aside>
 
      {/* Main */}
<main className="flex-1 p-6 overflow-y-auto">
 
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
 
        {/* Cards */}
<div className="grid grid-cols-3 gap-5">
 
          {/* Buy Products */}
<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8">
<path d="M6 6h15l-1.5 9h-13z" />
<path d="M6 6l-2-3H2" />
<circle cx="9" cy="20" r="1" />
<circle cx="18" cy="20" r="1" />
</svg>
</div>
<span className="text-xs bg-gray-100 px-2 py-1 rounded">Shop</span>
</div>
 
            <p className="text-3xl font-semibold">{products.length}</p>
<p className="text-sm text-gray-500">Buy Products</p>
 
            <button
              onClick={() => {
                setShowProducts(!showProducts);
                setShowCart(false);
                setShowFavorites(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded hover:bg-gray-200"
>
              {showProducts ? "Hide Products" : "View Products"}
</button>
</div>
 
          {/* Cart */}
<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8">
<rect x="1" y="3" width="15" height="13" rx="2" />
<path d="M16 8h4l3 4v4h-7V8z" />
<circle cx="5.5" cy="18.5" r="2.5" />
<circle cx="18.5" cy="18.5" r="2.5" />
</svg>
</div>
<span className="text-xs bg-gray-100 px-2 py-1 rounded">Cart</span>
</div>
 
            <p className="text-3xl font-semibold">{cart.length}</p>
<p className="text-sm text-gray-500">Add to Cart</p>
 
            <button
              onClick={() => {
                setShowCart(!showCart);
                setShowProducts(false);
                setShowFavorites(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded hover:bg-gray-200"
>
              {showCart ? "Hide Cart" : "View Cart"}
</button>
</div>
 
          {/* Favorites */}
<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
<div className="flex items-center justify-between">
<div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8">
<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
</svg>
</div>
<span className="text-xs bg-gray-100 px-2 py-1 rounded">Wishlist</span>
</div>
 
            <p className="text-3xl font-semibold">{favorites.length}</p>
<p className="text-sm text-gray-500">Favorites</p>
 
            <button
              onClick={() => {
                setShowFavorites(!showFavorites);
                setShowProducts(false);
                setShowCart(false);
              }}
              className="mt-2 bg-gray-100 py-2 rounded hover:bg-gray-200"
>
              {showFavorites ? "Hide Favorites" : "View Favorites"}
</button>
</div>
</div>
 
        {/* Products */}
        {showProducts && (
<div className="mt-6 bg-white p-5 rounded shadow">
<h3 className="font-semibold mb-3">Products</h3>
 
            {products.map((p, i) => (
<div key={i} className="flex justify-between border-b py-2">
 
                <div>
<p>{p.productName}</p>
<p className="text-sm text-gray-500">₹{p.productPrice}</p>
</div>
 
                <div className="flex gap-2">
<button
                    onClick={() => addToCart(p)}
                    className="bg-black text-white px-3 py-1 rounded text-sm"
>
                    Add Cart
</button>
 
                  <button
                    onClick={() => addToFavorites(p)}
                    className="border px-3 py-1 rounded text-sm"
>
                    ❤️
</button>
</div>
 
              </div>
            ))}
</div>
        )}
 
        {/* Cart */}
        {showCart && (
<div className="mt-6 bg-white p-5 rounded shadow">
<h3 className="font-semibold mb-3">Cart Items</h3>
 
            {cart.length === 0 ? "No items in cart" :
              cart.map((item, i) => (
<p key={i}>{item.productName}</p>
              ))
            }
</div>
        )}
 
        {/* Favorites */}
        {showFavorites && (
<div className="mt-6 bg-white p-5 rounded shadow">
<h3 className="font-semibold mb-3">Favorite Items</h3>
 
            {favorites.length === 0 ? "No favorites yet" :
              favorites.map((item, i) => (
<p key={i}>{item.productName}</p>
              ))
            }
</div>
        )}
 
      </main>
</div>
  );
}