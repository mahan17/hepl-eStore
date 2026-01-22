import { useState } from "react";
import { FaCreditCard, FaWallet, FaMobileAlt } from "react-icons/fa";
import "./dummyPayment.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const DummyPaymentModal = ({ amount, username, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("UPI");
  const dispatch = useDispatch();

  const handlePay = async () => {
    if (!username) {
      alert("Please login again");
      return;
    }

    setLoading(true);

    try {
      // ✅ 1. SAVE ORDER (IMPORTANT)
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          paymentMethod: method,
        }),
      });

      if (!res.ok) {
        throw new Error("Order creation failed");
      }

      // ✅ 2. CLEAR REDUX CART (DB cart already cleared in backend)
      dispatch(cartActions.clearCart());

      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 800);

    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="payment-backdrop">
      <div className="payment-modal">
        <h3 className="payment-title">Complete Payment</h3>

        <p className="pay-amount">
          Amount to Pay <span>₹ {amount}</span>
        </p>

        <div className="methods">
          <button
            className={`method ${method === "UPI" ? "active" : ""}`}
            onClick={() => setMethod("UPI")}
          >
            <FaMobileAlt /> UPI
          </button>

          <button
            className={`method ${method === "Card" ? "active" : ""}`}
            onClick={() => setMethod("Card")}
          >
            <FaCreditCard /> Card
          </button>

          <button
            className={`method ${method === "Wallet" ? "active" : ""}`}
            onClick={() => setMethod("Wallet")}
          >
            <FaWallet /> Wallet
          </button>
        </div>

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