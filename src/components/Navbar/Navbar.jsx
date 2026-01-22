import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { addressActions } from "../store/addressSlice";
import { loginActions } from '../store/uiLogin';
import { cartActions } from '../store/cartSlice'; 

import { FaHome, FaShoppingCart, FaUserCircle, FaBoxOpen } from 'react-icons/fa';

import './navbar.css';
import SearchBar from '../searchBar/SearchBar';

const Navbar = ({
  showHomeIcon = false,
  showSearchBar = true,
  activePage
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  const isLoggedIn = !!user;   
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        {/* ✅ LOGO + BRAND */}
        {/* Left Side */}
        
          {/* HOME ICON (only when needed) */}
          {showHomeIcon && !isAdmin && (
            <div
              className="home-icon-wrapper"
              onClick={() => navigate('/home')}
              title="Home"
            >
              <FaHome size={22} />
            </div>
          )}
        <div className="navbar-left brand-premium">
          {/* <img src={logo} alt="HEPL Logo" className="navbar-logo" /> */}
          <div className="brand-text">
            {/* <h1>HEPL</h1> */}
            <span><h1>ShopEase</h1></span>
          </div>
        </div>
        {/* ----------- */}
        {/* -------Right side--------- */}
        <div className="navbar-right">

          {/* SEARCH BAR – visible for all users */}
          {showSearchBar && !isAdmin && <SearchBar />}

          {/* ---------------- GUEST USER ---------------- */}
          {!isLoggedIn && (
            <div className="auth-buttons">
              <button
                className="nav-btn login"
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              <button
                className="nav-btn register"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          )}

  {/* ---------------- LOGGED-IN USER ---------------- */}
    {isLoggedIn && !isAdmin && (
      <>
        {/* ORDERS */}
        <div
          className={`orders-icon-wrapper ${activePage === 'orders' ? 'active' : ''}`}
          onClick={() => navigate('/orders')}
          title="My Orders"
        >
          {/* <FaBoxOpen size={26} /> */}
          Orders
        </div>

        {/* CART */}
        <div
          className={`cart-icon-wrapper ${activePage === 'cart' ? 'active' : ''}`}
          onClick={() => navigate('/cart')}
          title="Cart"
        >
          <FaShoppingCart size={22} />
          {cartQuantity > 0 && (
            <span className="cart-badge">{cartQuantity}</span>
          )}
        </div>

        {/* PROFILE */}
        <div className="profile-wrapper" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile"
          >
            <FaUserCircle size={26} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={() => navigate('/profile')}>
                My Profile
              </button>

              <button
                className="logout"
                onClick={() => {
                  localStorage.clear();
                  dispatch(loginActions.logout());
                  dispatch(addressActions.clearAddress());
                  dispatch(cartActions.clearCart());
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </>
    )}
    </div>
      </nav>
    </header>
  );
};

export default Navbar;