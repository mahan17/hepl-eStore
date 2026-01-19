import { useSelector } from 'react-redux';

const Profile = () => {
  const address = useSelector(state => state.address);

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto' }}>
      <h2>My Profile</h2>

      <h3>Delivery Address</h3>

      {address.fullName ? (
        <div>
          <p><strong>Name:</strong> {address.fullName}</p>
          <p><strong>Phone:</strong> {address.phone}</p>
          <p><strong>Address:</strong> {address.address}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>Pincode:</strong> {address.pincode}</p>
        </div>
      ) : (
        <p>No address saved yet</p>
      )}
    </div>
  );
};

export default Profile;
