"use client";

import type React from "react";
import { useState } from "react";
import { Home, Briefcase, MapPin } from "lucide-react";
import { useCart } from "../cartContext";
type CheckoutFormProps = {
  handleNextPage: () => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
};
export function CheckoutForm({
  handleNextPage,
  setName,
  setPhone,
}: CheckoutFormProps) {
  const { total, cartItems } = useCart() as any;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextPage();
  };

  const [paymentOption, setPaymentOption] = useState("payfull");
  const [locationType, setLocationType] = useState("home");
  const [currentName, setCurrentName] = useState("");
  const [currentPhone, setCurrentPhone] = useState("+968");

  const totalAmount = paymentOption === "payfull" ? total : 1.0;

  return (
    <div className="bg-white max-w-lg mx-auto">
      <div className="Popup_popup__1g1zm">
        <form onSubmit={handleSubmit} id="model_data" method="post">
          <div className="AddressForm_wrapper__xeQ1H p-4">
            <div className="AddressForm_formWrapper__WZq2k mt-4">
              <h3 className="text-xl font-bold mb-5">Delivery Location</h3>
              <div className="AddressForm_form__i7dus space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    value={currentName}
                    onChange={(e) => {
                      setCurrentName(e.target.value);
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    placeholder="Address"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="apartment" className="sr-only">
                    Apartment/Building
                  </label>
                  <input
                    id="apartment"
                    name="apartment"
                    className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    type="text"
                    placeholder="Apartment/Building"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="absolute left-3 -top-2.5 text-xs bg-white px-1 text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentPhone}
                    onChange={(e) => {
                      setCurrentPhone(e.target.value);
                      setPhone(e.target.value);
                    }}
                    type="tel"
                    maxLength={12}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="sr-only">
                    Delivery Instructions
                  </label>
                  <textarea
                    id="notes"
                    maxLength={200}
                    name="notes"
                    className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Add delivery instructions for the driver"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="MarketplaceCardPayment_topContent__K5bEQ p-4 border-t">
            <h3 className="text-lg font-semibold mb-4">Select Your Location</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                type="button"
                onClick={() => setLocationType("home")}
                className={`p-3 rounded-full flex items-center justify-center gap-2 transition-colors ${
                  locationType === "home"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                <Home size={20} /> Home
              </button>
              <button
                type="button"
                onClick={() => setLocationType("work")}
                className={`p-3 rounded-full flex items-center justify-center gap-2 transition-colors ${
                  locationType === "work"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                <Briefcase size={20} /> Work
              </button>
              <button
                type="button"
                onClick={() => setLocationType("customer")}
                className={`p-3 rounded-full flex items-center justify-center gap-2 transition-colors ${
                  locationType === "customer"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                <MapPin size={20} /> Customer
              </button>
            </div>
          </div>

          <div className="p-4 border-t">
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              20% cashback
            </span>
            <div className="OrderInfo_wrapper__GCgIK mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="OrderSubCartInfo_cart__81olU space-y-2">
                <h5 className="font-bold">National Fish Cart</h5>
                <div className="flex justify-between text-sm">
                  <p>
                    Products (<strong>{cartItems.length}</strong>)
                  </p>
                  <p>{total.toFixed(2)} OMR</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Delivery Fee</p>
                  <p>0.00 OMR</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t space-y-3">
            <label
              htmlFor="payfull"
              className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer border-2 border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                id="payfull"
                value="payfull"
                checked={paymentOption === "payfull"}
                name="paymentOption"
                type="radio"
                onChange={(e) => setPaymentOption(e.target.value)}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Pay Full Order Amount
                </p>
                <p className="text-sm text-gray-600">
                  Pay the total order amount now with your card and get free
                  delivery
                </p>
              </div>
            </label>
            <label
              htmlFor="pay-deposit"
              className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer border-2 border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                id="pay-deposit"
                value="deposit"
                checked={paymentOption === "deposit"}
                name="paymentOption"
                type="radio"
                onChange={(e) => setPaymentOption(e.target.value)}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Pay only 1 OMR to confirm your order
                </p>
                <p className="text-sm text-gray-600">
                  This will be deducted from the order total and you'll pay the
                  rest upon delivery with a delivery fee of 1 OMR
                </p>
              </div>
            </label>
          </div>

          <div className="MarketplaceCardPayment_stickyBottomContent__irsnG p-4 border-t sticky bottom-0 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Total Amount</h3>
              <h3 className="text-lg font-bold">
                {totalAmount.toFixed(2)} OMR
              </h3>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue to Payment ({totalAmount.toFixed(2)} OMR)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
