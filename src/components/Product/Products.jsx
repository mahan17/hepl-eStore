import { fetchProducts } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { useEffect } from 'react';
import ProductCard from './ProductCard';

import ProductSkeleton from './ProductSkeleton';
import './products.css';

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const searchQuery = useSelector(state => state.search.query);

  const { items, selectedCategory, status } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <section className="products-container">
        <ProductSkeleton count={15} />
      </section>
    );
  }

  let filteredProducts =
    selectedCategory === 'all'
      ? items
      : items.filter(p => p.category === selectedCategory);

  if (searchQuery.trim() !== '') {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <section className="products-container">
      <h3>Products</h3>
    <div className="products-grid">
      {filteredProducts.length === 0 && (
        <p className="no-results">No products found</p>
      )}

      {filteredProducts.map((product) => {
        const isInCart = cartItems.some(
          item => item._id === product._id
        );

        return (
          <ProductCard
            key={product._id}
            product={product}
            isInCart={isInCart}
            onAdd={(item) => dispatch(cartActions.addToCart(item))}
          />
        );
      })}
    </div>
  </section>
  );
};

export default Products;