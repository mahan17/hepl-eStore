// ProductCard.jsx
import "./productCard.css";

const ProductCard = ({ product, onAdd, isInCart }) => {
  return (
    <div className="product-card-ui">
      <div className="product-image-box">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <h4>{product.title}</h4>
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