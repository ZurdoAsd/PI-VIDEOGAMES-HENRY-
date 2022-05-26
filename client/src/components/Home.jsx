
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Videogame from "./Card.VG";
import SearchBar from "./SearchBar";
import Sorts from "../filtros y validacion/filtros";
import Paginado from "./Paginado";
import "../assets/home.css";

export default function Home() {
    const dispatch = useDispatch(); 
    const allVideogames = useSelector((state) => state.videogames);
    const [ order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [videogamesPerPage, setvideogamesPerPage] = useState(15);

    const indexOfLastVideogame = currentPage * videogamesPerPage;


    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;//1


    const currentVideogames = allVideogames.slice(
      indexOfFirstVideogame,
      indexOfLastVideogame
    );

    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };  

     const handleClick = () => {
      dispatch(getAllVideogames());
    };

    useEffect(() => {
      dispatch(getAllVideogames()); //trae todo
    }, [dispatch,]);
  
   
  
    return (
      <div className="Home">
        <div className="select"> 


      <SearchBar setCurrentPage={setCurrentPage}/> 


      <button className="botForm" onClick={handleClick}>RECARGAR</button>


      <Link to="/Create"><button className="botForm">Crear Videojuego </button></Link>   

      
      <Sorts setOrder={setOrder} setCurrentPage={setCurrentPage}/>
      
      <Paginado
  videogamesPerPage={videogamesPerPage}
  allVideogames={allVideogames.length}
  paginado={paginado}
        />

        {/* aca me va mostrarr todo 10 botones .... < 1 2 3 4 > */}


      </div>
      
      <div className= "contentCards">
          {
          currentVideogames.length>0? currentVideogames?.map((e) => {
            return (
              <Fragment>
                <Link to={`/home/${e.id}`}>
                  <Videogame
                    key={e.id}
                    name={e.name}
                    background_image={e.background_image}
                    genres={e.genres}
                  />
                </Link>
              </Fragment>
            );
          })
      
        :  
        <img src="https://imgflip.com/s/meme/Grus-Plan.jpg
        " alt="" justify-content= "center"align-items="center" height="100%"width="100%"/>
          }

        </div>
      </div>
    );
  }
  