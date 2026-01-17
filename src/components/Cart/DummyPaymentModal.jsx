import { useState } from "react";
import "./dummyPayment.css";

const DummyPaymentModal = ({ amount, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

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
        <h3>Complete Payment</h3>

        <p className="pay-amount">Amount: ₹ {amount}</p>

        <div className="methods">
          <button>UPI</button>
          <button>Card</button>
          <button>Wallet</button>
        </div>

        <button className="confirm-pay" onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button className="cancel-pay" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DummyPaymentModal;
