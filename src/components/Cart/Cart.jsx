import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, updateCartItem } from '../store/cartSlice';
import './cart.css';
import { addressActions } from '../store/addressSlice';
import Navbar from '../Navbar/Navbar';
import Footer from '../HomePage/Footer';
import AddressBox from "../Cart/AddressBox";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const username = useSelector(state => state.login.username);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty <br /><br /><button
            className="back-btn"
            onClick={() => navigate('/home')}
          >
            Back to Shopping
          </button></h2>;
  }

  return (
  <section className="cart-container">
    <Navbar
      showHomeIcon={true}
      showSearchBar={false}
      activePage="cart"
    />

    <h2>Your Cart</h2>

    <div className="cart-layout">
      
      {/* LEFT SIDE — EXISTING CART */}
      <div className="cart-left">
        {cartItems.map(item => (
  <div className="cart-item" key={item.productId}>
    <img
          src={
            item.image?.startsWith("http")
              ? item.image
              : `http://localhost:5000${item.image}`
          }
          alt={item.title}
        />

    <div className="cart-details">
      <h4>{item.title}</h4>
      <p className="price">₹ {item.price}</p>
    </div>

    <div className="quantity-controls">
      <button
        onClick={() =>
          dispatch(updateCartItem({
            username,
            productId: item.productId,
            type: "DEC",
          }))
        }
      >
        −
      </button>

      <span>{item.quantity}</span>

      <button
        onClick={() =>
          dispatch(updateCartItem({
            username,
            productId: item.productId,
            type: "INC",
          }))
        }
      >
        +
      </button>
    </div>

    <p className="subtotal">
      ₹ {(item.price * item.quantity).toFixed(2)}
    </p>

    <button
      className="remove-btn"
      onClick={() =>
        dispatch(updateCartItem({
          username,
          productId: item.productId,
          type: "REMOVE",
        }))
      }
    >
      Remove
    </button>
  </div>
))}
      </div>

      {/* RIGHT SIDE — ADDRESS + SUMMARY */}
      <div className="cart-right">

         <AddressBox />

        {/* EXISTING SUMMARY (UNCHANGED) */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Total Items</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹ {totalAmount.toFixed(2)}</span>
          </div>

          <div className="pay-back-btn">
            <button
              className="back-btn"
              onClick={() => navigate('/home')}
            >
              Back to Shopping
            </button>

            <button
              className="payment-btn"
              onClick={() =>
                navigate('/payment', {
                  state: {
                    totalAmount: totalAmount.toFixed(2),
                    totalItems: totalQuantity,
                  },
                })
              }
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </section>
);

};

export default Cart;
