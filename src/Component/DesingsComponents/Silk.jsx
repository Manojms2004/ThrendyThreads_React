import React from "react";
import { Link } from "react-router-dom";
export default function Silk() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Silk Collection</h1>
      <img
        src="https://th.bing.com/th/id/OIP.AZKm-lRCEkRHz4EkddIEVAAAAA?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Silk Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Silk is a natural protein fiber known for its smooth texture and lustrous appearance. 
          It is soft, breathable, and perfect for luxurious garments.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Soft, smooth, and glossy</li>
          <li>Lightweight and breathable</li>
          <li>Strong natural fiber</li>
          <li>Retains shape well</li>
          <li>Available in vibrant colors</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Sarees, gowns, dresses, scarves, and ties. Perfect for weddings, festive occasions, 
          and formal events.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Dry clean recommended</li>
          <li>Avoid direct sunlight for prolonged periods</li>
          <li>Do not wring or twist</li>
          <li>Iron on low heat, preferably with cloth on top</li>
        </ul>
      </section>
        <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
              ← Back to Home
            </Link>
    </div>
  );
}
