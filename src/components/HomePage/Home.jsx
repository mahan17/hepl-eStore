import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { useLocation } from "react-router-dom";

import Navbar from '../Navbar/Navbar';
import Products from '../Product/Products';
import Footer from './Footer';
import CategoryBar from '../Navbar/CategoryBar';
import LandingPage from '../LandingPage/LandingPage';
import '../Navbar/CategoryBar.css';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items || []);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }


  return (
    <>
      {!isAdminRoute &&
        <Navbar
          showHomeIcon={false}
          showSearchBar={true}
          activePage="home"
        />}
      <CategoryBar />
      <LandingPage></LandingPage>
      <Products />
      <Footer/>
    </>
  );
};

export default Home;
