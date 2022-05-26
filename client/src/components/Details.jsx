import React,{ useEffect }  from "react";
import {useSelector, useDispatch}  from 'react-redux'
import { useParams } from "react-router-dom";
import {getGameById, clear}  from '../redux/actions'
import {Link } from 'react-router-dom'
import"../assets/Details.css"

export default function Details() {
  const {id}  = useParams()
  let game = useSelector((state)=>state.gameDetail)
  let dispatch = useDispatch()
    
  useEffect(()=>{
    dispatch(getGameById(id))
    return ()=> dispatch(clear()) 
  },[dispatch,id])

 if(game.name) {
  return   (
  <div className="head">
  <div>
  <h1>{game.name}</h1>
    </div><img src={game.background_image} alt="AroundImage.jpg" className="image"  height="400px"width="550px"/><div>
      
    <h3>Description</h3>
      <div>{game.description}</div>
      
    <span>
      <h3>Platforms</h3>
      <ul>
        {game.plataforms||game.platforms
         ?.map(p => {
          return (<ul key={p}>{p}</ul>)
        })
        }
      </ul>
    </span>

     <span>
      <h3>Genres</h3>
       
   {game.id.length>8?
       game.Genres
      ?.map(g=>{
      return(<ul key={g.id}>{g.name}</ul>)
    }):game.genres?.map(g=>{
      return(<ul key={g.id}>{g}</ul>)
    }) } 
    </span> 
    <span>
      <h3>Rating</h3>
      <div>{game.rating}</div>
     <h3>release date: </h3>
      <div>{game.released}</div>
    </span>
  </div>

  <Link to="/home" >
    <button className='botForm'>Go to Home</button>
  </Link>

</div>
)
}return <p>loading</p>
}