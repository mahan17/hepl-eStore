import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ From Cart Redux
  const cartItems = useSelector(state => state.cart.items);
  const reduxTotalAmount = useSelector(state => state.cart.totalAmount);
  const reduxTotalItems = useSelector(state => state.cart.totalQuantity);

  // ✅ From Router State (fallback)
  const { totalAmount, totalItems } = location.state || {};

  const finalAmount = totalAmount ?? reduxTotalAmount;
  const finalItems = totalItems ?? reduxTotalItems;

  if (!cartItems.length) {
    return <h2 className="payment-empty">No payment data found</h2>;
  }

  return (
    <section className="payment-container">
      <h2>Payment Summary</h2>

      {/* ✅ PRODUCT DETAILS */}
      <div className="payment-products">
        {cartItems.map(item => (
          <div className="payment-product" key={item._id}>
            <img src={item.image} alt={item._title} />

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

      {/* ✅ SUMMARY */}
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

          <button className="pay-now-btn">
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;
