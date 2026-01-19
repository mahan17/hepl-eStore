import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { loginActions } from '../store/uiLogin';

import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

import './navbar.css';
import logo from '../../assets/images/hepl-logo.png'
import SearchBar from '../searchBar/SearchBar';
import CategoryBar from './CategoryBar';


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

        {/* SEARCH BAR (hide in Cart) */}
        {showSearchBar && <SearchBar />}

        {/* HOME ICON (only for Cart page) */}
        {showHomeIcon && (
          <div
            className="home-icon-wrapper"
            onClick={() => navigate('/home')}
            title="Home"
          >
            <FaHome size={22} />
          </div>
        )}

        {/* CART ICON */}
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
            onClick={() => setShowProfileMenu(prev => !prev)}
            title="Profile"
          >
            <FaUserCircle size={26} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={() => navigate('/profile')}>My Profile</button>
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  dispatch(loginActions.logout());
                  navigate("/login", { replace: true });
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      </nav>
    </header>
  );
};

export default Navbar;