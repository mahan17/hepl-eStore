import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Navbar from './Navbar';
import Products from '../Product/Products';
import Footer from './Footer';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Products />
      <Footer/>
    </>
  );
};

export default Home;
