import React from "react";
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
    return (
        <div className="recipe-list">
            {recipes.length === 0 ? (
                <p>No recipes found. Try a different search.</p>
            ) : (
                recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
                            View Recipe
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecipeList;