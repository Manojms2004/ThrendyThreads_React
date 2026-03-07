import React from "react";
import { Link } from "react-router-dom";
export default function Srees() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Srees Collection</h1>
      <img
        src="https://koala.sh/api/image/v2-8tct4-ibdyf.jpg?width=1216&height=832&dream"
        alt="Srees Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Traditional srees are elegant and perfect for special occasions. 
          They often feature embroidery, prints, or embellishments.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Soft and smooth</li>
          <li>Flowing drape</li>
          <li>Can include silk, cotton, or blended fibers</li>
          <li>Often decorated with embroidery or patterns</li>
          <li>Light to medium weight</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Ideal for weddings, festivals, religious ceremonies, and formal events.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Dry clean recommended</li>
          <li>Store away from direct sunlight</li>
          <li>Handle embellishments gently</li>
          <li>Iron on low heat if required</li>
        </ul>
      </section>
        <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
              ← Back to Home
            </Link>
    </div>
  );
}
