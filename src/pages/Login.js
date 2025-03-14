import React from "react";
import "./styles.css";

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <button className="login-btn">Login</button>
    </div>
  );
};

export default Login;
