import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchForm.css";

const SearchForm = ({ setQuery, setCuisine, setMealType, fetchRecipes }) => {
    const [cuisines, setCuisines] = useState([]);
    const [meals, setMeals] = useState([]);
    const [localQuery, setLocalQuery] = useState("");

    useEffect(() => {
        const fetchCuisinesAndMeals = async () => {
            try {
                const cuisinesRes = await axios.get("http://localhost:5001/api/cuisines");
                setCuisines(cuisinesRes.data.cuisines);
            } catch (error) {
                console.error("❌ Error fetching cuisines:", error);
            }

            try {
                const mealsRes = await axios.get("http://localhost:5001/api/meals");
                setMeals(mealsRes.data.mealTypes);
            } catch (error) {
                console.error("❌ Error fetching meals:", error);
            }
        };

        fetchCuisinesAndMeals();
    }, []);

    return (
        <div>
            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search recipes..."
            />
            <button onClick={() => setQuery(localQuery)}>Search</button>

            <select onChange={(e) => setCuisine(e.target.value)}>
                <option value="">Select Cuisine</option>
                {cuisines.map((cuisine, index) => (
                    <option key={index} value={cuisine}>{cuisine}</option>
                ))}
            </select>

            <select onChange={(e) => setMealType(e.target.value)}>
                <option value="">Select Meal Type</option>
                {meals.map((meal, index) => (
                    <option key={index} value={meal}>{meal}</option>
                ))}
            </select>

            <button onClick={fetchRecipes}>Find Recipes</button>
        </div>
    );
};

export default SearchForm;