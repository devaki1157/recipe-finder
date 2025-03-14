import React from "react";
import SearchBar from "../components/SearchBar";
import CuisineList from "../components/CuisineList";
import "./styles.css";

const Home = () => {
  return (
    <div className="home">
      <SearchBar />
      <h2>Browse Cuisines</h2>
      <CuisineList />
    </div>
  );
};

export default Home;
