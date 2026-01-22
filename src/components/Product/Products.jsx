import { fetchProducts } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserCart } from "../store/cartSlice";

import { useEffect } from 'react';
import ProductCard from './ProductCard';

import ProductSkeleton from './ProductSkeleton';
import './products.css';

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const searchQuery = useSelector(state => state.search.query);
  const username = useSelector(state => state.login.username);

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
          item => item.productId === product._id
        );

        return (
          <ProductCard
            key={product._id}
            product={product}
            isInCart={isInCart}
            onAdd={(product) => {
              if (!username) {
                alert("Please login to add items to cart");
                return;
              }

              const updatedItems = [
                ...cartItems,
                {
                  productId: product._id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                },
              ];

              dispatch(
                saveUserCart({
                  username,
                  items: updatedItems,
                })
              );
            }}

                  />
                );
              })}
    </div>
  </section>
  );
};

export default Products;