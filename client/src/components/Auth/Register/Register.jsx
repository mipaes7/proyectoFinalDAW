import React, { useState } from "react";
import { registerUser } from "../../../services/users";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    isadmin: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match!");
      console.log("Error: Passwords do not match!");
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        isadmin: formData.isadmin,
      });

      console.log("User registered successfully:", response);
      setSuccess("Registration successful! You can now log in.");
      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        isadmin: false,
      });
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit} className="registerForm">
        <h2 className="registerTitle">Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          className="registerInput"
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="registerInput"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="registerInput"
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="registerInput"
          placeholder="Repeat Password"
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
        />
        <button className="registerSubmitBtn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
