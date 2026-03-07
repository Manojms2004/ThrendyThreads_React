import React from "react";
import { Link } from "react-router-dom";
export default function Livin() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Livin Collection</h1>
      <img
        src="https://th.bing.com/th/id/OIP.hKP8JOjI5sI6TJZtiLKuYQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Livin Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Livin fabrics are comfortable, modern, and versatile. 
          Designed for daily wear, they balance style and ease of movement.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Soft and breathable</li>
          <li>Light to medium weight</li>
          <li>Easy to maintain</li>
          <li>Durable for everyday wear</li>
          <li>Available in multiple colors and patterns</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Casual outfits, tops, trousers, skirts, and light jackets. 
          Perfect for work, daily wear, or casual meet-ups.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Machine wash cold</li>
          <li>Use mild detergent</li>
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
