import React from "react";
import { Link } from "react-router-dom";
export default function Velvet() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
       
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">Velvet Fabric Collection</h1>

      {/* Image */}
      <img
        src="https://e2768ktp78o.exactdn.com/wp-content/uploads/2023/03/DSC2445.jpg?strip=all&lossy=1&resize=1000%2C563&ssl=1" // Replace with your velvet image
        alt="Velvet Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      {/* Overview */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Velvet is a soft, luxurious fabric characterized by a dense pile of evenly cut fibers 
          that gives it a smooth, plush feel. It is known for its rich texture and elegant drape, 
          making it a popular choice for formal wear and premium home decor.
        </p>
      </section>

      {/* Fabric Properties */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Soft and smooth texture</li>
          <li>Luxurious and elegant appearance</li>
          <li>Moderate to heavy weight</li>
          <li>Good drape, holds shape well</li>
          <li>Available in natural and synthetic fibers</li>
        </ul>
      </section>

      {/* Uses / Occasions */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Velvet is perfect for evening gowns, jackets, sarees, and wedding attire. 
          It adds a luxurious touch to home furnishings like cushions, curtains, and upholstery. 
          Ideal for formal events, festive celebrations, and winter wear.
        </p>
      </section>

      {/* Care Instructions */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Dry clean recommended for best results</li>
          <li>Avoid direct sunlight to prevent fading</li>
          <li>Do not wring or twist the fabric</li>
          <li>Iron on low heat, preferably on the reverse side</li>
        </ul>
      </section>
   <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
        ← Back to Home
      </Link>
    </div>
  );
}
