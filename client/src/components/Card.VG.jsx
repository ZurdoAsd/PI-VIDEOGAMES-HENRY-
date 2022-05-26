import React from "react";
import "../assets/CardVG.css";

function Videogame({ name, background_image, genres }) {
  return (
    <div className="content">  
    <ul className="card">
      <div className="name">{name}</div>
      <img src={background_image} alt="" className="img"  />
     <div className="genres">{genres}</div>    
    </ul>
    </div>
  );
}

export default Videogame;