import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addressActions } from "../store/addressSlice";
import { loginActions } from '../store/uiLogin';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgetPassword';
import './login.css';
import logo from '../../assets/images/hepl-logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.login.errors);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openForgot, setOpenForgot] = useState(false);

  const navigate = useNavigate(); // ✅ hook to navigate

  const submitHandler = async (e) => {
  e.preventDefault();

  dispatch(
    loginActions.validateForm({
      username,
      password,
    })
  );

  // basic frontend validation
  if (
    !username.includes('@') ||
    !username.includes('.com') ||
    password.length < 6
  ) {
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

      alert("Login Successful");


    const addressRes = await fetch(
        `http://localhost:5000/api/address?username=${username}`
      );
      const addressData = await addressRes.json();

      if (addressData) {
        dispatch(addressActions.loadAddress(addressData));
      } else {
        dispatch(addressActions.clearAddress());
      }

      // ✅ CREATE USER OBJECT (IMPORTANT)
      const userData = {
        username: username, // using email as unique username
        email: username,
        role: data.role,
      };

      // ✅ SAVE LOGIN STATE
      localStorage.setItem("isLoggedIn", "true");

      // ✅ SAVE USER OBJECT
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ LOAD ADDRESS INTO REDUX (CRITICAL)
      const savedAddress = JSON.parse(
        localStorage.getItem(`address_${username}`)
      );

      if (savedAddress) {
        dispatch(addressActions.loadAddress(savedAddress));
      } else {
        dispatch(addressActions.clearAddress());
      }

      // prevent going back to login
      if (data.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }

    } catch (error) {
        alert("Server error. Try again later.");
      }
  }

  return (
    <>
    <div className="login-container">
      
      <div>
        <img src={logo} alt="HEPL Logo" />
        <h2>Login</h2>
      </div>
      

      <form onSubmit={submitHandler}>
        <p>
          <label><strong>Username</strong></label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
          <span className="error">{errors.username}</span>
        </p>

        <p>
          <label><strong>Password</strong></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
          <span className="error">{errors.password}</span>
        </p>

        <p>
          <input type="submit" value="Login" />
        </p>
        <p className='forget-pass' onClick={() => setOpenForgot(true)}>
          Forget Password
        </p>


        <p className='register-btn'>
            Don't have an account ? <span id='register-link' onClick={() => navigate('/register')}>Register here</span>
        </p>

      </form>
      <ForgotPassword
        open={openForgot}
        handleClose={() => setOpenForgot(false)}
      />

    </div>
    </>
  );
};
// onClick={() => navigate('/register')}

export default Login;