import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
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
      <h2>Your Cart</h2>

      {cartItems.map(item => (
        <div className="cart-item" key={item._id}>
          
          {/* Product Image */}
          <img src={item.image} alt={item.title} />

          {/* Product Details */}
          <div className="cart-details">
            <h4>{item.title}</h4>
            <p className="category">{item.category}</p>
            <p className="price">₹ {item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="quantity-controls">
            <button onClick={() => dispatch(cartActions.removeFromCart(item._id))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(cartActions.addToCart(item))}>+</button>
          </div>

          {/* Subtotal */}
          <p className="subtotal">₹ {item.totalPrice.toFixed(2)}</p>

          {/* Remove */}
          <button
            className="remove-btn"
            onClick={() => dispatch(cartActions.removeFromCart(item._id))}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalQuantity}</span>
        </div>

        <div className="summary-row total">
          <span>Total Amount</span>
          <span>₹ {totalAmount.toFixed(2)}</span>
        </div>

        <div className='pay-back-btn'>
{/*GO -------------To Shopping btn ------------------*/}
          <button
            className="back-btn"
            onClick={() => navigate('/home')}
          >
            Back to Shopping
          </button>
  {/* --------------Payment btn----------------------- */}
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
    </section>
  );
};

export default Cart;
