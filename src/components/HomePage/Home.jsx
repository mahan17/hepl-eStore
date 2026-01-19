import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';

import Navbar from '../Navbar/Navbar';
import LandingSlider from '../LandingPage/LandingSlider';
import Products from '../Product/Products';
import Footer from './Footer';
import CategoryBar from '../Navbar/CategoryBar';
import '../Navbar/CategoryBar.css';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items || []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <CategoryBar />
      {/* {products.length > 0 && (
        <LandingSlider products={products.slice(0, 5)} />
      )} */}
      <Products />
      <Footer/>
    </>
  );
};

export default Home;
