import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        // Fetch favorite recipes from the backend
        const fetchFavorites = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/favorites", {
                    headers: { Authorization: localStorage.getItem("token") },
                });
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, [navigate, user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="profile">
            <h1>Welcome, {user?.name}!</h1>
            <p>Email: {user?.email}</p>

            <h2>Your Favorite Recipes</h2>
            {favorites.length > 0 ? (
                <ul className="favorite-list">
                    {favorites.map((recipe) => (
                        <li key={recipe._id}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorite recipes yet.</p>
            )}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
    );
};

export default Profile;