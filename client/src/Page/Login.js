import React, { useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from '../redux/AsyncMethods/AuthMethods';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const myToken = localStorage.getItem("userData");
    if(myToken) {
      // Use the token as needed
      console.log("Token:", myToken);
      navigate("/home");
    }
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your authentication logic here
    // For example, sending a request to a server or 
    dispatch(postLogin(formData));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className='login-button' type="submit">Login</button>
      </form>
      {/* <div className='create-account-link'>
        <Link to="/register">Create Account</Link>
      </div> */}
    </div>
  );
};

export default Login;
