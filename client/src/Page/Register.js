import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { postRegister } from "../redux/AsyncMethods/AuthMethods";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState("")

  useEffect(() => {
    const myToken = localStorage.getItem("userData");

    if (myToken) {
      // Use the token as needed\
      setUser(myToken);
      console.log("Token:", myToken);
      navigate("/home");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your registration logic here
    // For example, sending a registration request to a server or using an authentication library
    dispatch(postRegister(formData));
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button className="register-btn" type="submit">
          Create Account
        </button>
      </form>
      <div className="login-link">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
