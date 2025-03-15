import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/harshitha/Desktop/RecipeFinder/recipe-finder-frontend/src/components/Home.css";

const Home = ({ setUser }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleToggle = () => setIsLogin(!isLogin);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? "/api/auth/login" : "/api/auth/signup";

        try {
            const response = await fetch(`http://localhost:5001${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="home-container">
            <h1 className="welcome-text">Welcome to Recipe Finder</h1>
            <p className="home-description">
                Discover delicious recipes from around the world! Whether you're looking for a quick meal, a fancy dinner, or a delightful dessert, we've got you covered.
            </p>
            <button className="lets-cook-btn" onClick={() => navigate("/find-recipe")}>
                Let's Cook 🍽️
            </button>

            <div className="auth-container">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
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
                <p onClick={handleToggle} className="toggle-text">
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Home;