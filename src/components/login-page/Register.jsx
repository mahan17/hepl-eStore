import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/uiLogin';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showPassword, showConfirmPassword } =
    useSelector((state) => state.login);

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required';
    else if (!username.includes('@') || !username.includes('.com'))
      newErrors.username = 'Username must contain @ and .com';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword)
      newErrors.confirmPassword = 'Confirm Password is required';
    else if (confirmPassword !== password)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registered Successfully!");
      navigate("/"); // go to login page

    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  const backNavigate = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        {/* Username */}
        <p>
          <label><strong>Username</strong></label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <span className="error">{errors.username}</span>
        </p>

 {/* Password */}
    <div className="form-group">
      <label><strong>Password</strong></label>

      <div className="input-with-icon">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <span
          className="eye-icon"
          onClick={() => dispatch(loginActions.togglePassword())}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>

      <span className="error">{errors.password}</span>
    </div>
    <br />
        {/* Confirm Password */}
        <div>
          <label><strong>Confirm Password</strong></label>

          <div className="input-with-icon">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <span
              className="eye-icon"
              onClick={() =>
                dispatch(loginActions.toggleConfirmPassword())
              }
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <span className="error">{errors.confirmPassword}</span>
        </div>

        {/* Submit */}
        <p>
          <input type="submit" value="Register" />
          <br />
          <br />
          <button onClick={backNavigate} className='back-register'>Back</button>

        </p>
      </form>
    </div>
  );
};

export default Register;