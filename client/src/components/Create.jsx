import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, postGame } from "../redux/actions";
import validate from "../filtros y validacion/validate";
import ".././assets/Create.css";
import fotoAux from "../assets/fotoAux.jpeg";

export default function AddVideogame() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const allGenres = useSelector((state) => state.genres);
  const [input, setInput] = useState({
    name: "",
    released: "",
    rating: "",
    description: "",
    background_image: fotoAux,
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const arrayPlataform = [
    "PlayStation 3",
    "Xbox 360",
    "Xbox Series S/X",
    "Nintendo Switch",
    "PlayStation 5",
    "Xbox One",
    "PC",
    "PlayStation 4",
  ];

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  console.log(input)

  function handleGenres(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
  }
  const handleDeleteG = (e) => {
    let filtro = input.genres.filter((f) => f !== e.target.value);
    console.log(e);

    setInput({
      ...input,
      genres: [...filtro],
    });
  };

  function handleReset(e) {
    e.preventDefault();
    setInput({
      name: "",
      released: "",
      rating: "",
      description: "",
      background_image: fotoAux,
      genres: [],
      platforms: [],
    });
    setErrors({});
  }

  function handlePlatFrom(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
  }

  const handleDeleteP = (e) => {
    let filtro = input.platforms.filter((f) => f !== e.target.value);
    setInput({
      ...input,
      platforms: [...filtro],
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    if (
      input.name &&
      input.released &&
      input.description &&
      input.genres.length &&
      input.platforms.length &&
      !Object.keys(errors).length
    ) 
    
    {
      dispatch(postGame(input));
      alert("VideoJuego Creado!!");
      setInput({
        name: "",
        released: "",
        rating: "",
        description: "",
        background_image: fotoAux,
        genres: [],
        platforms: [],
      });
    } else {
      alert("Todos los elementos son requeridos!!");
    }
  }

  return (
    <div className="warp">
      <h3 className="formTitle">
        <span>Add</span> VideoGame
      </h3>
      <div className="form">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            <div>
              <label>Name</label>
              <input
                className="input"
                type="text"
                placeholder="name"
                name="name"
                value={input.name}
                onChange={handleChange}
              ></input>
              {errors.name && <p className="errors"> {errors.name} </p>}
            </div>
            <div>
              <label>released</label>
              <input
                className="input"
                type="date"
                min="2001-01-20"
                max="2022-07-02"
                name="released"
                value={input.released}
                onChange={handleChange}
              ></input>
              {errors.released && <p className="errors"> {errors.released} </p>}
            </div>
            <div>
              <label>description</label>
              <textarea
                type="text"
                name="description"
                placeholder="description...."
                value={input.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="errors"> {errors.description} </p>
              )}
            </div>
            <div>
              <label>Rating</label>
              <input
                className="input"
                type="number"
                placeholder="1 a 5"
                step="0.10"
                min="1"
                max="5"
                name="rating"
                value={input.rating}
                onChange={handleChange}
              ></input>
              {errors.rating && <p className="errors"> {errors.rating} </p>}
            </div>
            <div>

              
              <div>
                <h3>genres</h3>
                <select className="input" onChange={handleGenres}>
                  <option disabled selected>
                    select
                  </option>
                  {allGenres?.map((x) => {
                    return (
                      <option name="genres" value={x.name}>
                        {x.name}
                      </option>
                    );
                  })}
                </select>
                {errors.genres && <p className="errors"> {errors.genres} </p>}
              </div>





              <div>
                <h3>platforms</h3>
                <select className="input" onChange={handlePlatFrom}>
                  <option disabled selected>
                    select
                  </option>
                  {arrayPlataform?.map((x) => {
                    return (
                      <option name="platforms" value={x}>
                        {x}
                      </option>
                    );
                  })}
                </select>
                {errors.platforms && (
                  <p className="errors"> {errors.platforms} </p>
                )}
              </div>
            </div>
          </div>


          <div>
            <button className="botForm" onChange={handleSubmit} type="submit">
              Submit
            </button>
            <button className="botForm" type="reset">
              Reset
            </button>
          </div>
        </form>




        <div>
          {input.platforms.map((e) => (
            <div>
              <div key={e} name={e} value={e}>
                {e}
              </div>
              {/* <button name={e} value={e} onClick={handleDeleteP} key={e}> */}
              <button value={e} onClick={handleDeleteP}>
                X
              </button>
            </div>
          ))}
        </div>


        <div>
          {input.genres.map((e) => (
            <div>
              <div key={e} name={e} value={e}>
                {e}
              </div>
              <button name={e} value={e} onClick={handleDeleteG} key={e}>
                X
              </button>
            </div>
          ))}
        </div>

        <Link to="/home">
          <button className="botForm">Go to home</button>
        </Link>
      </div>
    </div>
  );
}
