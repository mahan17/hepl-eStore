import "./productModal.css";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>×</button>

        <img src={product.image} alt={product.title} />

        <div className="modal-details">
          <h2>{product.title}</h2>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
