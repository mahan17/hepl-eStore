import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';

import Navbar from '../Navbar/Navbar';
import Products from '../Product/Products';
import Footer from './Footer';
import CategoryBar from '../Navbar/CategoryBar';
import LandingPage from '../LandingPage/LandingPage';
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
      <Navbar
        showHomeIcon={false}
        showSearchBar={true}
        activePage="home"
      />
            <CategoryBar />
      <LandingPage></LandingPage>


      <Products />
      <Footer/>
    </>
  );
};

export default Home;
