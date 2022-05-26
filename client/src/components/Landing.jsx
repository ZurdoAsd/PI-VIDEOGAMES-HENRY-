import React from "react";
import { Link } from "react-router-dom";
import "../assets/Landingpage.css";

const Landing = () => {
  return (
    <div className= "landingContainer">
   
      <Link to="/home">
        <button className="landingButton" type="button">START</button>
      </Link>
    </div>
  );
};

export default Landing;