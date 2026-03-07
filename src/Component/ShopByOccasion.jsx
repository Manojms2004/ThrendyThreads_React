// src/Components/ShopByOccasion.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { allProducts } from "./ProductsData";

export default function ShopByOccasion({
  wishlist = [],
  toggleWishlist = () => {},
  extraProducts = [],
  designer = null,
}) {

  const [selectedCategory, setSelectedCategory] = useState("cotton");
  const navigate = useNavigate();

  const mergedProducts = [...allProducts, ...extraProducts];

  const productsToShow = mergedProducts.filter((product) => {
    if (designer) {
      return (
        product.designer === designer &&
        product.category === selectedCategory
      );
    }

    return (
      !product.designer &&
      product.category === selectedCategory
    );
  });

  return (
    <div className="w-full bg-white p-4">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Shop by Occasion
      </h2>

      {/* CATEGORY BUTTONS */}
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        {["cotton", "banarasi", "wedding"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-[40px] px-5 border-2 rounded-md cursor-pointer capitalize transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS CONTAINER */}
      <div className="max-h-[650px]">

        <div className="flex flex-wrap justify-center gap-6">

          {productsToShow.length === 0 ? (
            <p className="text-center w-full text-gray-500">
              No products found.
            </p>
          ) : (
            productsToShow.map((product) => (
              <div
                key={product.id}
                className="w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300"
              >

                {/* IMAGE */}
                <div
                  className="relative overflow-hidden rounded-lg h-[300px] cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />

                  {/* WISHLIST */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-2">

                  <p className="font-medium text-gray-800">
                    {product.name}
                  </p>

                  <p className="text-red-600 font-semibold">
                    ₹{product.finalPrice}
                  </p>

                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="mr-1" />
                    {product.rating}
                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}