import React from 'react';
import './productSkeleton.css';

const ProductSkeleton = ({ count = 15 }) => {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="product-card skeleton" key={i}>
          <div className="skeleton-img" />
          <div className="skeleton-text title" />
          <div className="skeleton-text category" />
          <div className="skeleton-text price" />
          <div className="skeleton-btn" />
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
