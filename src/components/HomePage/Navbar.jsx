import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { loginActions } from '../store/uiLogin';
import { setCategory } from '../store/productSlice';

import { FaUserCircle } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

import './navbar.css';
import logo from '../../assets/hepl-logo.png'
import SearchBar from '../searchBar/SearchBar';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.products.categories);
  const selectedCategory = useSelector(state => state.products.selectedCategory);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  const handleLogout = () => {
    dispatch(loginActions.logout());
    navigate('/login');
  };

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
          <img src={logo} alt="HEPL Logo" className="navbar-logo" />
          <div className="brand-text">
            <h1>HEPL</h1>
            <span>eStore</span>
          </div>
        </div>
        {/* ----------- */}
          
       {/* -------Right side--------- */}
      <div className="navbar-right">
        <SearchBar></SearchBar>
        <div
          className="cart-icon-wrapper"
          onClick={() => navigate('/cart')}
          title="Cart"
        >
          <FaShoppingCart size={22} />
          {cartQuantity > 0 && (
            <span className="cart-badge">{cartQuantity}</span>
          )}
        </div>

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
                  dispatch(loginActions.logout());
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

          {/*--------------------------*/}
      </nav>

      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;