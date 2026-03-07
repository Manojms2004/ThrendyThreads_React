import React from "react";
import { Link } from "react-router-dom";
export default function Georgette() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Georgette Collection</h1>
      <img
        src="https://tse1.explicit.bing.net/th/id/OIP.NDwTqid-u3rYHSeyyKyTFgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="Georgette Fabric"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
      />

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-lg leading-relaxed">
          Georgette is a lightweight, sheer fabric with a slightly crinkled texture. 
          It flows beautifully, making it ideal for dresses, sarees, and scarves.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Fabric Properties</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Lightweight and flowing</li>
          <li>Sheer with slight texture</li>
          <li>Soft and breathable</li>
          <li>Drapes elegantly</li>
          <li>Available in vibrant colors and prints</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Uses & Occasions</h2>
        <p className="text-lg leading-relaxed">
          Perfect for sarees, dresses, blouses, and scarves. Ideal for parties, weddings, 
          and festive occasions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Care Instructions</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Hand wash in cold water</li>
          <li>Use mild detergent</li>
          <li>Do not wring</li>
          <li>Air dry in shade</li>
          <li>Iron on low heat</li>
        </ul>
      </section>
        <Link to="/Home" className="text-blue-600 hover:underline font-semibold">
              ← Back to Home
            </Link>
    </div>
  );
}
