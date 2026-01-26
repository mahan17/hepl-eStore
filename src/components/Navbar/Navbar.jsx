import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { addressActions } from "../store/addressSlice";
import { loginActions } from '../store/uiLogin';
import { cartActions } from '../store/cartSlice'; 

import { FaHome, FaShoppingCart, FaUserCircle, FaBoxOpen, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

import SearchBar from '../searchBar/SearchBar';
import './navbar.css';

const Navbar = ({
    showHomeIcon = false,
    showSearchBar = true,
    activePage
  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const profileRef = useRef(null);

    const cartQuantity = useSelector(state => state.cart.totalQuantity);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const isLoggedIn = !!user;   
    const isAdmin = user?.role === "admin";

    const handleLogout = () => {
      localStorage.clear();
      dispatch(loginActions.logout());
      dispatch(addressActions.clearAddress());
      dispatch(cartActions.clearCart());
      navigate("/", { replace: true });

      setShowProfileMenu(false);
      setShowMobileMenu(false);
    };

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
          {/* DESKTOP SEARCH */}
          {showSearchBar && !isAdmin && (
            <div className="search-wrapper">
              <SearchBar />
            </div>
          )}

          {/* DESKTOP – GUEST */}
          {!isLoggedIn && (
            <div className="desktop-only auth-buttons">
              <button className="nav-btn login" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="nav-btn register" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          )}

          {/* DESKTOP – LOGGED IN */}
          {isLoggedIn && !isAdmin && (
            <>
              <div
                className={`desktop-only orders-icon-wrapper ${activePage === "orders" ? "active" : ""}`}
                onClick={() => navigate("/orders")}
              >
                Orders
              </div>

              <div
                className={`desktop-only cart-icon-wrapper ${activePage === "cart" ? "active" : ""}`}
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart size={22} />
                {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
              </div>

              <div className="desktop-only profile-wrapper" ref={profileRef}>
                <div
                  className="profile-icon"
                  onClick={() => setShowProfileMenu(prev => !prev)}
                >
                  <FaUserCircle size={26} />
                </div>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <button onClick={() => navigate("/profile")}>My Profile</button>
                    <button className="logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ☰ MOBILE HAMBURGER */}
          <div
            className="mobile-only hamburger"
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
            onClick={() => {
              setShowMobileMenu(prev => !prev);
              setShowProfileMenu(false); // close profile if open
            }}
            onKeyDown={(e) => e.key === "Enter" && setShowMobileMenu(prev => !prev)}
          >
            {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
    </nav>

        {showMobileMenu && (
          <div className="mobile-menu">
            {!isLoggedIn && (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
              </>
            )}

            {isLoggedIn && !isAdmin && (
              <>
                <button onClick={() => navigate("/orders")}>Orders</button>
                <button onClick={() => navigate("/cart")}>
                  Cart ({cartQuantity})
                </button>
                <button onClick={() => navigate("/profile")}>My Profile</button>
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
              </>
            )}
          </div>
        )}
    </header>
  );
};

export default Navbar;