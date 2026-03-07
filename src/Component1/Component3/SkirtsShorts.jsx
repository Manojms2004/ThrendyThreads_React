import React from "react";
import { Link } from "react-router-dom";
export default function SkirtsShorts() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Skirts & Shorts Collection</h1>
      <img
        src="https://i.pinimg.com/originals/f7/8e/ec/f78eece7284a63b862f83f3e4a2d65c5.jpg"
        alt="Skirts & Shorts Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />
     
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Trendy skirts and shorts fabrics are versatile and stylish, designed for casual 
          and semi-formal wear. Comfortable and easy to move in.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Lightweight and breathable</li>
          <li>Soft texture for comfort</li>
          <li>Durable and easy to maintain</li>
          <li>Available in cotton, denim, and blended fabrics</li>
          <li>Flexible for casual or party wear</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Casual outings, parties, office wear, and weekend activities. Works for both young 
          and mature styles.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Machine wash cold or hand wash</li>
          <li>Do not bleach</li>
          <li>Air dry or tumble dry low</li>
          <li>Iron on medium heat if needed</li>
        </ul>
      </section>
        <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
              ← Back to Home
            </Link>
    </div>
  );
}
