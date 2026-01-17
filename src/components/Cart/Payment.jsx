import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DummyPaymentModal from './DummyPaymentModal';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPayment, setShowPayment] = useState(false);

  const cartItems = useSelector(state => state.cart.items);
  const reduxTotalAmount = useSelector(state => state.cart.totalAmount);
  const reduxTotalItems = useSelector(state => state.cart.totalQuantity);

  const { totalAmount, totalItems } = location.state || {};

  const finalAmount = totalAmount ?? reduxTotalAmount;
  const finalItems = totalItems ?? reduxTotalItems;

  if (!cartItems.length) {
    return <h2 className="payment-empty">No payment data found</h2>;
  }

  return (
    <>
      <section className="payment-container">
        <h2>Payment Summary</h2>

        <div className="payment-products">
          {cartItems.map(item => (
            <div className="payment-product" key={item._id}>
              <img src={item.image} alt={item.title} />

              <div className="product-info">
                <h4>{item.title}</h4>
                <p>Price: ₹ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="product-total">
                ₹ {item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="payment-card">
          <div className="row">
            <span>Total Items</span>
            <span>{finalItems}</span>
          </div>

          <div className="row total">
            <span>Total Amount</span>
            <span>₹ {finalAmount}</span>
          </div>

          <div className="payment-actions">
            <button
              className="back-cart-btn"
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </button>

            <button
              className="pay-now-btn"
              onClick={() => setShowPayment(true)}
            >
              Pay Now
            </button>
          </div>
        </div>
      </section>

      {showPayment && (
        <DummyPaymentModal
          amount={finalAmount}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            alert("Payment Successful 🎉");
            navigate('/home');
          }}
        />
      )}
    </>
  );
};

export default Payment;
