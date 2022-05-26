import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVGname } from "../redux/actions";
import "../assets/SearchBar.css";


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
  
  
    function handleInputChange(e) {
      e.preventDefault();
      setName(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      if (!name) {
        return alert("Colocar un busqueda");
      } else {

      dispatch(getVGname(name));
      setName('')
      setCurrentPage(1);
      }


    }
  return (
    <div>
      <form onSubmit={handleSubmit}> 
      <input
        className="input"
        type="text"
        name='search'
        id='Search'
        placeholder="Videogames..."
        value={name}
        onChange={handleInputChange}
      />
      <button className="button">Search</button>
       </form>
    </div>
  );
}
