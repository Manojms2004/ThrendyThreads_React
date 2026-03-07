import React from "react";
import { Link } from "react-router-dom";
export default function Denim() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Denim Collection</h1>
      <img
        src="https://tse1.mm.bing.net/th/id/OIP.opadxCoI2dQ3jpUEworeQAHaHa?w=1400&h=1400&rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Denim Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Denim is a durable cotton twill fabric, iconic for jeans and casual wear. 
          Known for strength and comfort, it’s a staple in fashion worldwide.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Durable and long-lasting</li>
          <li>Comfortable after wear</li>
          <li>Twilled weave, diagonal lines visible</li>
          <li>Available in multiple washes and colors</li>
          <li>Medium to heavy weight</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Perfect for jeans, jackets, skirts, and casual shirts. Great for daily wear, 
          outdoor activities, and casual outings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Machine wash cold</li>
          <li>Avoid bleach</li>
          <li>Tumble dry low or air dry</li>
          <li>Iron on medium heat if necessary</li>
        </ul>
      </section>
        <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
              ← Back to Home
            </Link>
    </div>
  );
}
