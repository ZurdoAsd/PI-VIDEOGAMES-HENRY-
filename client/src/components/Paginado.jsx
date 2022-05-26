import React from "react";
import "../assets/Paginado.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
})
 {
  const pagNum = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pagNum.push(i);
  }
  return (
    <nav>
      <div>
        <ul>
          {pagNum &&
            pagNum.map((number) => (
              
                <button
                  className="button"
                  // href="#/"
                  key={number}
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              
            ))}
        </ul>
      </div>
    </nav>
  );
}
