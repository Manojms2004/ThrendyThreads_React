import { useNavigate } from "react-router-dom";

export default function About() {

  const navigate = useNavigate(); // 🔥 add this

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 Banner Image Section */}
      <div className="relative h-[400px] w-full">
        <img
          src="/ShopBrand.png"
          alt="TreandyThreads"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About TreandyThreads
          </h1>
        </div>
      </div>

      {/* 🔥 Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 bg-white shadow-lg -mt-16 relative z-10 rounded-xl">

        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>TreandyThreads</strong> is a contemporary fashion brand
          dedicated to celebrating elegance, tradition, and modern design.
          We specialize in curated collections of sarees, designer wear,
          festive collections, and premium ethnic fashion for women.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Our mission is to blend traditional craftsmanship with modern
          fashion aesthetics. Every collection is thoughtfully designed to
          reflect confidence, sophistication, and timeless beauty.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          At TreandyThreads, we collaborate with skilled artisans and
          designers to create high-quality fabrics including cotton,
          silk, georgette, velvet, and wedding collections that
          resonate with global fashion trends.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Our Vision
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          To become a trusted fashion destination where tradition meets
          innovation, empowering women to express their unique style with
          confidence and grace.
        </p>

        {/* 🔥 BACK BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}