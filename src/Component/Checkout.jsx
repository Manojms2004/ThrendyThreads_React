// src/Checkout.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const maxStock = 5;
  const [quantity, setQuantity] = useState(1);

  // 🔥 Address State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 🔥 Payment State
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!product) return <div className="p-6">No product selected</div>;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const subtotal = product.finalPrice * quantity;
  const gst = Math.round(subtotal * 0.18);
  const deliveryCharge = subtotal > 1999 ? 0 : 99;
  const discount = subtotal > 5000 ? 500 : 0;
  const totalAmount = subtotal + gst + deliveryCharge - discount;

  const increaseQty = () => {
    if (quantity < maxStock) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    const { fullName, phone, street, city, state, pincode } = address;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      alert("⚠ Please fill all address details.");
      return;
    }

    if (!paymentMethod) {
      alert("⚠ Please select payment method.");
      return;
    }

    if (paymentMethod === "COD") {
      alert("🎉 Order placed successfully with Cash on Delivery!");
      navigate("/");
    }

    if (paymentMethod === "UPI") {
      alert("💳 Redirecting to UPI Payment Gateway...");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT - PRODUCT */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex gap-6 items-start">
            <img
              src={product.img}
              alt={product.name}
              className="w-36 h-36 object-cover rounded-lg"
            />

            <div className="space-y-3 flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>

              <p className="text-gray-600">
                {formatPrice(product.finalPrice)} per item
              </p>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity:
                </label>

                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQty}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="px-4 font-medium">{quantity}</span>

                  <button
                    onClick={increaseQty}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Only {maxStock} left in stock
                </p>
              </div>

              {/* ADDRESS FORM */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-lg">
                  Delivery Address
                </h3>

                <div className="grid gap-3">
                  <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="street" placeholder="Street Address" onChange={handleChange} className="border p-2 rounded" />

                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="city" placeholder="City" onChange={handleChange} className="border p-2 rounded" />
                    <input type="text" name="state" placeholder="State" onChange={handleChange} className="border p-2 rounded" />
                  </div>

                  <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - PRICE DETAILS */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-6">Price Details</h2>

          {/* ADDRESS PREVIEW */}
          {address.fullName && (
            <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
              <p className="font-semibold mb-1">Deliver To:</p>
              <p>{address.fullName}</p>
              <p>{address.phone}</p>
              <p>{address.street}, {address.city}</p>
              <p>{address.state} - {address.pincode}</p>
              <hr className="my-3" />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal ({quantity} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>{formatPrice(gst)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- {formatPrice(discount)}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* 🔥 PAYMENT OPTIONS */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Select Payment Method</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="COD" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="UPI" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
                UPI / Google Pay / PhonePe
              </label>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition"
          >
            Proceed to Payment
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Safe and Secure Payments. Easy returns.
          </p>
        </div>
      </div>
    </div>
  );
}