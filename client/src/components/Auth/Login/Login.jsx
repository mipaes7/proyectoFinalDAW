import React, { useState, useContext } from "react";
import { loginUser } from "../../../services/users";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const response = await loginUser(formData);
      console.log("Login response:", response);

      const decodedToken = jwtDecode(response.token);
      console.log("Decoded token:", decodedToken);

      // global state
      setAuth({
        email: decodedToken.email,
        isAdmin: decodedToken.isadmin,
        userId: decodedToken.userId,
        isAuthenticated: true,
      });

      // navegar a homepage
      navigate('/');
      console.log("Logged in successfully");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <h2 className="loginTitle">Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          className="loginInput"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="loginInput"
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="submitLoginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
