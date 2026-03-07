import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Category Links */}
        <div>
          <h3 className="font-semibold mb-4">Fabric</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/velvet">Velvet</Link>
            <Link to="/silk">Silk</Link>
            <Link to="/georgette">Georgette</Link>
            <Link to="/srees">Srees</Link>
            <Link to="/livin">Livin</Link>
            <Link to="/skirts-shorts">Skirts & Shorts</Link>
            <Link to="/denim">Denim</Link>
            <Link to="/body-type">Shop by Body Type</Link>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2 text-sm">
  <Link to="/about">
    About Us
  </Link>

  <Link to="/locatestore" >
    Store Locator
  </Link>
</div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3 text-xl">
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaFacebook className="cursor-pointer hover:text-blue-600" />
            <FaYoutube className="cursor-pointer hover:text-red-600" />
            <FaLinkedin className="cursor-pointer hover:text-blue-700" />
            <FaPinterest className="cursor-pointer hover:text-red-500" />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">TreandyThreads</h2>
          <p className="text-sm">© 2026 TreandyThreads.com</p>
          <p className="text-sm mb-2">All Rights Reserved</p>
          <p className="text-sm">Ph No: 01143078400</p>
          <p className="text-sm mt-2">
            Fable Street Lifestyle Solutions Private Limited <br />
            362, Phase II, Udyog Vihar, Sector 20, Gurugram, Haryana 122016
          </p>
          <p className="text-sm mt-2">Timings: 09:30 AM to 06:30 PM</p>
        </div>

      </div>
    </footer>
  );
}
