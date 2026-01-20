import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./admin.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: null
  });

  /* =======================
     FETCH PRODUCTS (READ)
  ======================== */
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =======================
     HANDLE INPUTS
  ======================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /* =======================
     ADD / UPDATE PRODUCT
  ======================== */
  const submitProduct = async () => {
  if (!formData.title || !formData.price || !formData.category) {
    alert("All fields are required");
    return;
  }

  const data = new FormData();
  data.append("title", formData.title);
  data.append("price", formData.price);
  data.append("category", formData.category);
  if (formData.image) data.append("image", formData.image);

  try {
    const res = await fetch(
      editId
        ? `http://localhost:5000/api/products/${editId}`
        : "http://localhost:5000/api/products",
      {
        method: editId ? "PUT" : "POST",
        body: data,
      }
    );

    // 🔴 IMPORTANT CHECK
    if (!res.ok) {
      const errorText = await res.text(); // read HTML/text safely
      console.error("Backend error:", errorText);
      alert("Failed to save product. Check backend logs.");
      return;
    }

    const result = await res.json(); // ✅ safe now

    if (editId) {
      setProducts(prev =>
        prev.map(p => (p._id === editId ? result : p))
      );
    } else {
      setProducts(prev => [...prev, result]);
    }

    resetForm();
  } catch (err) {
    console.error("Network error:", err);
    alert("Server error");
  }
};

  /* =======================
     DELETE PRODUCT
  ======================== */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* =======================
     HELPERS
  ======================== */
  const resetForm = () => {
    setFormData({ title: "", price: "", category: "", image: null });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: null
    });
    setShowForm(true);
  };

  return (
    <>
      {/* <Navbar showSearchBar={false} /> */}

      <div className="admin-page">
        <h2>Manage Products</h2>

        <button className="admin-add-btn" onClick={() => setShowForm(true)}>
          + Add Product
        </button>

        {/* =======================
            FORM
        ======================== */}
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

        {/* =======================
            TABLE
        ======================== */}
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
            {products.length === 0 ? (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p._id}>
                    <td>
                        {p.image ? (
                            <img
                            src={p.image}
                            alt={p.title}
                            width="50"
                            height="50"
                            style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <span style={{ color: "#94a3b8", fontSize: "12px" }}>
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
                      onClick={() => deleteProduct(p._id)}
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
    </>
  );
};

export default AdminProducts;