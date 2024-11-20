import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    isadmin: false
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match!");
      console.log("Error: Passwords do not match!");
      return;
    }

    setError(null);
    console.log("Registering user:", formData);
    // This is where you'd handle actual registration logic (e.g., API call)
  };

  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit} className="registerForm">
        <h2 className="registerTitle">Sign Up</h2>
        {error && <p className="error">{error}</p>}
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
