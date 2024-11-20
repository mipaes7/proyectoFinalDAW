import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      console.log("Error: Both fields are required.");
      return;
    }

    setError(null);
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <h2 className="loginTitle">Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          className="loginInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submitLoginBtn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
