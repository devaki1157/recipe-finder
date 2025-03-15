import React, { useState } from "react";
import axios from "axios";

const FindRecipe = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState("");  // Added cuisine state
    const [mealType, setMealType] = useState("");  // Added mealType state

    const fetchRecipes = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/recipes", {
                params: { query, cuisine, mealType },  // Sending all filters
            });
            console.log("Fetched Recipes:", response.data);
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching recipes:", error.response?.data || error.message);
            alert("Failed to fetch recipes.");
        }
    };

    return (
        <div>
            <h2>Find Recipes</h2>
            
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
            />

            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                <option value="">Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="French">French</option>
            </select>

            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>

            <button onClick={fetchRecipes}>Search</button>

            <div>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} width="150" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindRecipe;