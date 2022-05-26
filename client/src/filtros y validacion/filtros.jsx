import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";
import { sortGen,sortVG,OrderBy,OrderByR,getGenres} from '../redux/actions'
import "../assets/filtros.css"

 function Sorts({setCurrentPage,setOrder}){
    const dispatch = useDispatch(); 
    const allGenres = useSelector((state)=> state.genres);
    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);

    const alpha= (e)=> {
      e.preventDefault();
        dispatch(OrderBy(e.target.value));
        setCurrentPage(1);
        setOrder(`ordenado${e.target.value}`);
      }
      const orderByrating= (e)=> {
        e.preventDefault();
        dispatch(OrderByR(e.target.value));
        setCurrentPage(1);
        setOrder(`ordenado${e.target.value}`)
      }
    const sortVideogames = (e) => {
        e.preventDefault();
        dispatch(sortVG(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado${e.target.value}`)
        ;}
     const sortGenres = (e) => {
          e.preventDefault();
          dispatch(sortGen(e.target.value))
          setCurrentPage(1);
          setOrder(`ordenado${e.target.value}`)
          ;}

        
        
console.log(allGenres.name)
return(
<div className="estilos.content">
    <div><h1 className="estilos">Order Alpha</h1>
<select
  name="selectBox"
  onChange={alpha}>
  <option value="A-Z">A-Z</option>
  <option value="Z-A">Z-A</option>
</select>
</div>

<div><h1  className="estilos">Order for Rating</h1>
<select
  className="estilos.a"
  onChange={orderByrating}>
  <option value="MaRating">Rating++</option>
  <option value="MeRating">Rating--</option>
</select>
</div>


<div> <h1 className="estilos">Genres</h1>
<select
 
  name="selectBox"
  onChange={(e)=>sortGenres(e)}>
  <option value="123">All</option>
  {allGenres.map(e => { return( <option value={e.name} key={e.name}>{e.name}</option>)})
  }
  
</select>
</div>

<div> <h1 className="estilos">Origin</h1>
<select
  name="selectBox"
  onChange={sortVideogames}>  
<option value="All">All</option>
<option value="Created">Created</option>
<option value="Existing">Existing</option>
</select>
</div>


</div>
)
}

export default Sorts