import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { useLocation } from "react-router-dom";

import Navbar from '../Navbar/Navbar';
import Products from '../Product/Products';
import Footer from './Footer';
import CategoryBar from '../Navbar/CategoryBar';
import LandingPage from '../LandingPage/LandingPage';
import ScrollToTop from "./ScrollToTop";
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


return (
  <>
    {!isAdminRoute && (
      <Navbar
        showHomeIcon={false}
        showSearchBar={true}
        activePage="home"
      />
    )}

    <CategoryBar />

    <div className="home-content">
      <LandingPage />
      <Products />
      <ScrollToTop />
      <Footer />
    </div>
  </>
);

};

export default Home;
