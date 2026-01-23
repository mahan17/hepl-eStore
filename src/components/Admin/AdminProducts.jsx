import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/adminProductSlice";

import ScrollToTop from "../HomePage/ScrollToTop";
import "./adminProducts.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state) => state.adminProducts
  );

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });

  /* =======================
     FETCH
  ======================== */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /* =======================
     HANDLERS
  ======================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /* =======================
     SUBMIT
  ======================== */
  const submitProduct = () => {
    if (!formData.title || !formData.price || !formData.category) {
      alert("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    if (editId) {
      dispatch(updateProduct({ id: editId, formData: data }));
    } else {
      dispatch(addProduct(data));
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", price: "", category: "", image: null });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditId(product._id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: null,
    });
    setShowForm(true);
  };

  const getImageUrl = (image) => {
  if (!image) return null;

  // already full URL (old products, CDN, etc.)
  if (image.startsWith("http")) {
    return image;
  }

  // backend uploaded image
  return `http://localhost:5000${image}`;
};

  return (
    <div className="admin-page">
      <ScrollToTop></ScrollToTop>
      <h2>Manage Products</h2>

      <button className="admin-add-btn" onClick={() => setShowForm(true)}>
        + Add Product
      </button>

      {showForm && (
        <div className="admin-form">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="form-actions">
            <button onClick={submitProduct}>
              {editId ? "Update" : "Save"}
            </button>
            <button className="danger" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? (
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.title}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                      No image
                    </span>
                  )}
                </td>

                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>₹ {p.price}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => dispatch(deleteProduct(p._id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
