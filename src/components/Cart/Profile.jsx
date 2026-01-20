import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./profile.css";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  /* ✅ SAFE USER READ */
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  /* 🚨 GUARD FIRST — BUT AFTER HOOKS */
  const [address, setAddress] = useState(null);
  const [profilePic, setProfilePic] = useState(
    user ? localStorage.getItem(`photo_${user.username}`) : null
  );

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, user]);

  /* 🔹 Load address from DB */
  useEffect(() => {
    if (!user) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/address?username=${user.username}`
        );
        const data = await res.json();
        setAddress(data || null);
      } catch (err) {
        console.error("Failed to load address", err);
        setAddress(null);
      }
    };

    fetchAddress();
  }, [user]);

  /* 🔹 Handle photo upload */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem(`photo_${user.username}`, reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  return (
    <>
      <Navbar
        showHomeIcon={true}
        showSearchBar={false}
        activePage="profile"
      />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={profilePic || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />

            <label className="upload-btn">
              Change Photo
              <input type="file" hidden onChange={handlePhotoUpload} />
            </label>

            <h2>{address ? address.fullName : "No address saved"}</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-section">
            <h3>Saved Address</h3>

            {address ? (
              <div className="address-card">
                <p><strong>Name:</strong> {address.fullName}</p>
                <p><strong>Phone:</strong> {address.phone}</p>
                <p><strong>Address:</strong> {address.address}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>Pincode:</strong> {address.pincode}</p>
              </div>
            ) : (
              <p>No address saved yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
