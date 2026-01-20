import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Components
import ProtectedRoute from "./components/HomePage/ProtectedRoute";
import Login from './components/login-page/login';
import Home from './components/HomePage/Home';
import Register from './components/login-page/Register';
import Cart from './components/Cart/Cart';
import Payment from './components/Cart/Payment';
import CartWatcher from "./components/Cart/CartWatcher";
import Profile from './components/Cart/Profile';
// Dashboard
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminProducts from "./components/Admin/AdminProducts";
// Store
import { fetchCartData } from './components/store/cart-actions';
import AdminRoute from './components/Admin/AdminRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Router>
      <CartWatcher />

      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}


export default App;
