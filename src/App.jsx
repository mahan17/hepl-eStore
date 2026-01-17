import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login-page/login';
import Home from './components/HomePage/Home';
import Register from './components/login-page/Register';
import Cart from './components/Cart/Cart';
import Payment from './components/Cart/Payment';
import CartWatcher from "./components/Cart/CartWatcher";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartData } from '../src/components/store/cart-actions';

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCartData());
    }, [dispatch]);
  
  return (
    <>
    <CartWatcher />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />   {/* ✅ ADD */}
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;