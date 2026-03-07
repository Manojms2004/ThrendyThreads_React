import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable store card
function StoreCard({ city, name, address, hours, phone, image, mapLink, reverse }) {
  return (
    <section
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center justify-center gap-12 px-8 py-12 hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Left - Store Image */}
      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={`${name} store`}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>

      {/* Right - Store Info */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-gray-600 text-sm">{city}</p>
        <h2 className="text-3xl font-semibold mb-4">{name}</h2>
        <p className="text-gray-700 mb-2">{address}</p>
        <p className="text-gray-700 mb-2">{hours}</p>
        <p className="text-gray-700 mb-6">Call Store: {phone}</p>

        <a href={mapLink} target="_blank" rel="noopener noreferrer">
          <button className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800">
            Get Directions
          </button>
        </a>
      </div>
    </section>
  );
}

export default function LocateStore() {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/Home")}
        className="mb-6 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
      >
        ← Back 
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-10">Locate Us</h2>

      {/* Stores */}
      <StoreCard
        city="Uttar Pradesh"
        name="Trendy Threads of India"
        address="2nd floor, D334, DLF Mall of India, Sector 18, Noida, Uttar Pradesh, 201301"
        hours="Opening Hours: 11:00 AM to 9:30 PM (Monday-Sunday)"
        phone="120-6209712"
        image="https://retaildesignblog.net/wp-content/uploads/2018/11/7R9A5263-780x520.jpg"
        mapLink="https://www.google.com/maps/place/DLF+Mall+of+India,+Noida/@28.5671429,77.3211441,17z"
      />

      <StoreCard
        city="Pune"
        name="Phoenix Market City"
        address="Unit F-73, First Floor, Phoenix Market City, Viman Nagar, Pune, Maharashtra"
        hours="Opening Hours: 11:00 AM to 9:30 PM (Monday-Sunday)"
        phone="020-66870046"
        image="https://images.pexels.com/photos/6311653/pexels-photo-6311653.jpeg"
        mapLink="https://www.google.com/maps/place/Phoenix+Marketcity+Pune/@18.5679,73.9143,17z"
        reverse
      />

      <StoreCard
        city="Noida"
        name="DLF Mall of India"
        address="2nd floor, D334, DLF Mall of India, Sector 18, Noida, Uttar Pradesh, 201301"
        hours="Opening Hours: 11:00 AM to 9:30 PM (Monday-Sunday)"
        phone="120-6209712"
        image="https://images.pexels.com/photos/7688105/pexels-photo-7688105.jpeg"
        mapLink="https://www.google.com/maps/place/DLF+Mall+of+India,+Noida/@28.5671429,77.3211441,17z"
      />

      <StoreCard
        city="Mumbai"
        name="Trendy Threads - Mumbai"
        address="Unit 12, 1st Floor, Linking Road, Bandra West, Mumbai, Maharashtra"
        hours="Opening Hours: 11:00 AM to 9:30 PM (Monday-Sunday)"
        phone="022-33445566"
        image="https://images.pexels.com/photos/8029709/pexels-photo-8029709.jpeg"
        mapLink="https://www.google.com/maps/place/Bandra+Linking+Road,+Mumbai/"
        reverse
      />
    </div>
  );
}
