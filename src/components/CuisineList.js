import React from "react";
import "./styles.css";

const cuisines = ["Italian", "Continental", "Asian", "Desserts", "Indian"];

const CuisineList = () => {
  return (
    <div className="cuisine-list">
      {cuisines.map((cuisine) => (
        <button key={cuisine} className="cuisine-btn">
          {cuisine}
        </button>
      ))}
    </div>
  );
};

export default CuisineList;
