import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Orders from './components/Orders/Orders';

// Admin
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminLayout from './components/Admin/AdminLayout';
import AdminRoute from './components/Admin/AdminRoute';

// Store
import { loginActions } from './components/store/uiLogin';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(loginActions.restoreLogin({ username: user.username }));
    }
  }, [dispatch]);

  return (
    <Router>
      <CartWatcher />

      <Routes>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
        </Route>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* PROTECTED */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;