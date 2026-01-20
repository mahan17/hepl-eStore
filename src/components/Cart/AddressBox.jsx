import { useDispatch, useSelector } from "react-redux";
import { addressActions } from "../store/addressSlice";
import { useState, useEffect } from "react";
import "./addressBox.css";

const AddressBox = () => {
  const dispatch = useDispatch();
  const address = useSelector(state => state.address);
  const [saved, setSaved] = useState(false);

  /* ✅ Stable user read */
  const storedUser = localStorage.getItem("user");
  const username = storedUser ? JSON.parse(storedUser).username : null;

  /* 🔹 Load address from DB once per user */
  useEffect(() => {
    if (!username) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/address?username=${username}`
        );

        const data = await res.json();

        if (data) {
          dispatch(addressActions.loadAddress(data));
        } else {
          dispatch(addressActions.clearAddress());
        }
      } catch (err) {
        console.error("Failed to load address", err);
      }
    };

    fetchAddress();
  }, [dispatch, username]);

  /* 🔹 Handle input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addressActions.updateAddress({ name, value }));
  };

  /* 🔹 Save address to DB */
  const handleSaveAddress = async () => {
    if (!username) {
      alert("Please login");
      return;
    }

    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }

    try {
      const payload = { username, ...address };

      const res = await fetch("http://localhost:5000/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert("Failed to save address");
    }
  };

  /* 🔹 Clear address from DB */
  const handleClearAddress = async () => {
    if (!username) return;

    if (!window.confirm("Clear saved address?")) return;

    try {
      await fetch(
        `http://localhost:5000/api/address?username=${username}`,
        { method: "DELETE" }
      );

      dispatch(addressActions.clearAddress());
    } catch (err) {
      alert("Failed to clear address");
    }
  };

  return (
    <div className="address-box">
      <h3>Delivery Address</h3>

      <input
        name="fullName"
        placeholder="Full Name"
        value={address.fullName}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={address.phone}
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="Full Address"
        value={address.address}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />

      <input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
      />

      <div className="address-actions">
        <button className="save-address-btn" onClick={handleSaveAddress}>
          Save Address
        </button>

        <button className="clear-address-btn" onClick={handleClearAddress}>
          Clear Address
        </button>
      </div>

      {saved && (
        <p className="address-success">
          Address saved successfully ✓
        </p>
      )}
    </div>
  );
};

export default AddressBox;
