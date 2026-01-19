import { useState } from "react";
import { FaCreditCard, FaWallet, FaMobileAlt } from "react-icons/fa";
import "./dummyPayment.css";

const DummyPaymentModal = ({ amount, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("UPI");

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="payment-backdrop">
      <div className="payment-modal">

        <h3 className="payment-title">Complete Payment</h3>

        <p className="pay-amount">
          Amount to Pay <span>₹ {amount}</span>
        </p>

        {/* PAYMENT METHODS */}
        <div className="methods">
          <button
            className={`method ${method === "UPI" ? "active" : ""}`}
            onClick={() => setMethod("UPI")}
          >
            <FaMobileAlt />
            UPI
          </button>

          <button
            className={`method ${method === "Card" ? "active" : ""}`}
            onClick={() => setMethod("Card")}
          >
            <FaCreditCard />
            Card
          </button>

          <button
            className={`method ${method === "Wallet" ? "active" : ""}`}
            onClick={() => setMethod("Wallet")}
          >
            <FaWallet />
            Wallet
          </button>
        </div>

        {/* PAY BUTTON */}
        <button
          className="confirm-pay"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? `Processing ${method}...` : `Pay with ${method}`}
        </button>

        <button className="cancel-pay" onClick={onClose}>
          Cancel
        </button>

        <p className="secure-text">🔒 Secure & Encrypted Payment</p>

      </div>
    </div>
  );
};

export default DummyPaymentModal;