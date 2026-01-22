// ProductCard.jsx
import { useState } from "react";
import "./productCard.css";

const ProductCard = ({ product, onAdd, isInCart }) => {
  const [showFullTitle, setShowFullTitle] = useState(false);

  const renderTitle = (title, wordLimit = 3) => {
    const words = title.split(" ");

    // If title is short, show as is
    if (words.length <= wordLimit) return title;

    // Expanded state
    if (showFullTitle) {
      return (
        <>
          {title}
          <span
            style={{ color: "#9ca3af", cursor: "pointer" }}
            onClick={() => setShowFullTitle(false)}
          >
            {" "}less
          </span>
        </>
      );
    }

    // Collapsed state
    return (
      <>
        {words.slice(0, wordLimit).join(" ")}
        <span
          style={{ color: "#9ca3af", cursor: "pointer" }}
          onClick={() => setShowFullTitle(true)}
        >
          {" "}...more
        </span>
      </>
    );
  };

  return (
    <div className="product-card-ui">
      <div className="product-image-box">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000${product.image}`
          }
          alt={product.title}
        />
      </div>

      <div className="product-info">
        <h4 >{renderTitle(product.title)}</h4>
        <p className="category">{product.category}</p>

        <div className="price-row">
          <span className="price">₹ {product.price}</span>
          <span className="rating">⭐ 4.5</span>
        </div>

        <button
          className="add-btn"
          disabled={isInCart}
          onClick={() => onAdd(product)}
        >
          {isInCart ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;