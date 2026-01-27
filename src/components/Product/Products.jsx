import { fetchProducts } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserCart } from "../store/cartSlice";

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from "./ProductModal";

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

  const [selectedProduct, setSelectedProduct] = useState(null);

  let filteredProducts =
    selectedCategory === 'all'
      ? items
      : items.filter(p => p.category === selectedCategory);

  if (searchQuery.trim() !== '') {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const groupedByCategory = filteredProducts.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.6 }
    );

    const titles = document.querySelectorAll(".category-title");
    titles.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [groupedByCategory]);

  if (status === 'loading') {
    return (
      <section className="products-container">
        <ProductSkeleton count={15} />
      </section>
    );
  }
  
return (
  <section className="products-container" id="products">
    {/* Top Title */}
    <h2 className="products-title">Products</h2>

    {Object.keys(groupedByCategory).length === 0 && (
      <p className="no-results">No products found</p>
    )}

    {Object.entries(groupedByCategory).map(([category, products]) => (
      <div key={category} className="category-section">
        {/* Category Title */}
        <h3 className="category-title">{category}</h3>

        <div className="products-grid">
          {products.map((product) => {
            const isInCart = cartItems.some(
              item => item.productId === product._id
            );

            return (
              <ProductCard
                key={product._id}
                product={product}
                isInCart={isInCart}
                onClick={() => setSelectedProduct(product)}
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
      </div>
    ))}
    
    <ProductModal
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />

  </section>
);
};

export default Products;