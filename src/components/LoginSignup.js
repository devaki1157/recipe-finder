import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import "./LoginSignup.css";

const LoginSignup = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ Use navigation

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError("");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
            const response = await axios.post(`http://localhost:5001${endpoint}`, formData);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user info
                localStorage.setItem("token", response.data.token); // ✅ Store token
                setUser(response.data.user);
                navigate("/profile"); // ✅ Redirect to profile after login/signup
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Try again.");
        }
    };

    return (
        <div className="login-signup-container">
            <div className="form-box">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <p onClick={toggleForm} className="toggle-text">
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;