"use client";
import type React from "react";
import { useState } from "react";
import { Home, Briefcase, MapPin } from "lucide-react";
import "./info.css";
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
    <div className="checkout-container">
      <form onSubmit={handleSubmit} id="model_data" method="post">
        <div className="delivery-form-wrapper">
          <div className="delivery-form-container">
            <h3 className="form-title">Delivery Location</h3>
            <div className="form-fields">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="input-field"
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
                  className="input-field"
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
                  className="input-field"
                  type="text"
                  placeholder="Apartment/Building"
                  required
                />
              </div>
              <div className="phone-input-wrapper">
                <label htmlFor="phone" className="phone-input-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="phone-input"
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
                  className="textarea-field"
                  placeholder="Add delivery instructions for the driver"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="location-section">
          <h3 className="location-title">Select Your Location</h3>
          <div className="location-buttons-grid">
            <button
              type="button"
              onClick={() => setLocationType("home")}
              className={`location-button ${
                locationType === "home" ? "active" : ""
              }`}
            >
              <Home size={20} /> Home
            </button>
            <button
              type="button"
              onClick={() => setLocationType("work")}
              className={`location-button ${
                locationType === "work" ? "active" : ""
              }`}
            >
              <Briefcase size={20} /> Work
            </button>
            <button
              type="button"
              onClick={() => setLocationType("customer")}
              className={`location-button ${
                locationType === "customer" ? "active" : ""
              }`}
            >
              <MapPin size={20} /> Customer
            </button>
          </div>
        </div>

        <div className="order-info-section">
          <span className="cashback-badge">20% cashback</span>
          <div className="order-summary-wrapper">
            <div className="order-summary-cart">
              <h5 className="order-summary-title">National Fish Cart</h5>
              <div className="order-summary-row">
                <p>
                  Products (<strong>{cartItems.length}</strong>)
                </p>
                <p>{total.toFixed(2)} OMR</p>
              </div>
              <div className="order-summary-row">
                <p>Delivery Fee</p>
                <p>0.00 OMR</p>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-options-section">
          <label htmlFor="payfull" className="payment-option-label">
            <input
              id="payfull"
              value="payfull"
              checked={paymentOption === "payfull"}
              name="paymentOption"
              type="radio"
              onChange={(e) => setPaymentOption(e.target.value)}
              className="payment-option-radio"
            />
            <div>
              <p className="payment-option-title">Pay Full Order Amount</p>
              <p className="payment-option-description">
                Pay the total order amount now with your card and get free
                delivery
              </p>
            </div>
          </label>
          <label htmlFor="pay-deposit" className="payment-option-label">
            <input
              id="pay-deposit"
              value="deposit"
              checked={paymentOption === "deposit"}
              name="paymentOption"
              type="radio"
              onChange={(e) => setPaymentOption(e.target.value)}
              className="payment-option-radio"
            />
            <div>
              <p className="payment-option-title">
                Pay only 1 OMR to confirm your order
              </p>
              <p className="payment-option-description">
                This will be deducted from the order total and you'll pay the
                rest upon delivery with a delivery fee of 1 OMR
              </p>
            </div>
          </label>
        </div>

        <div className="sticky-footer">
          <div className="total-amount-row">
            <h3 className="total-amount-title">Total Amount</h3>
            <h3 className="total-amount-title">{totalAmount.toFixed(2)} OMR</h3>
          </div>
          <button type="submit" className="submit-button">
            Continue to Payment ({totalAmount.toFixed(2)} OMR)
          </button>
        </div>
      </form>
    </div>
  );
}
