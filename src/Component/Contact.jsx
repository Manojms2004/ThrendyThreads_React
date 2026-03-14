import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.reason ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const payload = {
        yourName: formData.name,
        emailAddress: formData.email,
        reasonForContact: formData.reason,
        subject: formData.subject,
        yourMessage: formData.message
      };

      await axios.post(
        "https://localhost:44332/api/Contact/AddContact",
        payload
      );

      toast.success("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        reason: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => navigate("/home")}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer absolute z-1 mt-5 ml-5"
      >
        ← Back
      </button>

      {/* Top Black Section */}
      <div className="bg-black py-20 text-center">
        <h1 className="text-4xl font-bold text-white">
          Contact Us
        </h1>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto -mt-16 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-4"
        >

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-semibold mb-1">
              Reason For Contact
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select reason</option>
              <option value="order">Order Issue</option>
              <option value="product">Product Inquiry</option>
              <option value="return">Return / Refund</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              rows="3"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer"
          >
            Submit
          </button>

        </form>
      </div>

    </div>

  );
}