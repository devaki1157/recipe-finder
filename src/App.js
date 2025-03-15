import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import LoginSignup from "./components/LoginSignup"; 
import RecipeList from "./components/RecipeList";
import Profile from "./components/Profile";
import axios from "axios";
import "./App.css";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);
    const [cuisine, setCuisine] = useState("");  // ✅ Ensure it's defined
    const [mealType, setMealType] = useState(""); // ✅ Ensure it's defined
    const [query, setQuery] = useState("");  // ✅ Ensure it's defined
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchRecipes = async () => {
        if (!cuisine && !mealType && !query) {
            console.error("❌ Missing parameters in fetchRecipes");
            return;
        }

        try {
            console.log(`🔍 Fetching recipes for Cuisine: ${cuisine}, Meal: ${mealType}, Dish: ${query}`);

            const response = await axios.get("http://localhost:5001/api/recipes", {
                params: { cuisine, mealType, query },
            });

            console.log("✅ API Response:", response.data);
            setRecipes(response.data.results || []);
        } catch (error) {
            console.error("❌ Error fetching recipes:", error.response?.data || error.message);
        }
    };

    return (
        <div className={location.pathname === "/find-recipe" ? "recipe-finder-container" : "home-container"}>
            {/* Navbar */}
            <nav className="navbar">
                <div className="nav-left">
                    <Link to="/" className="logo">Recipe Finder</Link>
                </div>
                <div className="nav-right">
                    <Link to="/find-recipe">Find Recipe</Link>
                    {user ? (
                        <Link to="/profile" className="profile-btn">Profile</Link>
                    ) : (
                        <Link to="/login" className="login-btn">Login / Signup</Link>
                    )}
                </div>
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={
                    <div className="home-content">
                        <h1 className="welcome-text">Welcome to Recipe Finder</h1>
                    </div>
                } />
                <Route path="/find-recipe" element={
                    <>
                        <SearchForm 
                            setQuery={setQuery} 
                            setCuisine={setCuisine} 
                            setMealType={setMealType} 
                            fetchRecipes={fetchRecipes} 
                        />
                        <RecipeList recipes={recipes} />
                    </>
                } />
                <Route path="/login" element={
                    <div className="login-container">
                        <LoginSignup setUser={setUser} />
                    </div>
                } />
                <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

// Wrap App with Router
const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;