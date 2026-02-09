import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const RazorpayPayment = ({ amount, username, onSuccess }) => {
  const dispatch = useDispatch();

  const handlePayment = async () => {
    if (!username) {
      alert("Please login again");
      return;
    }

    // 1️⃣ Create Razorpay order
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    // 2️⃣ Razorpay options
   const options = {
    key: "rzp_test_S6q9WqWXqErR9s",
    amount: order.amount,
    currency: "INR",
    name: "HEPL eStore",
    description: "UPI Payment",
    order_id: order.id,

    // 🔥 FORCE ONLY UPI
    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
    },

    // 🔥 HIDE DEFAULT BLOCKS (removes login-like UI)
    config: {
      display: {
        blocks: {
          upi: {
            name: "Pay using UPI",
            instruments: [{ method: "upi" }],
          },
        },
        sequence: ["block.upi"],
        preferences: {
          show_default_blocks: false,
        },
      },
    },

    handler: async function (response) {
      await fetch("http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          username,
          amount,
        }),
      });

      dispatch(cartActions.clearCart());
      onSuccess();
    },

    prefill: {
      email: username,
    },

    theme: {
      color: "#6f4e37", // Coffee Brown instead of Blue
    },
};

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button className="confirm-pay" onClick={handlePayment}>
      Pay ₹{amount} with Razorpay
    </button>
  );
};

export default RazorpayPayment;