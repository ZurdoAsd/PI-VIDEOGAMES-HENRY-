const axios = require('axios');
const {Videogame, Genres} = require('../db');
const {API, API_KEY} = process.env

const get1= async () =>{
 const resp= await axios(`${API}${API_KEY}`)
 const data = await resp.data.results.map(e =>{
    return{
       id:e.id,
       name: e.name,
       background_image:e.background_image,
       genres: e.genres.map(e=>e.name),
       rating: e.rating,   
    } 
 })   
 return data; 
};

const get2= async () =>{
    const resp= await axios(`${API}${API_KEY}&page=2`)
    const data = await resp.data.results.map(e =>{
       return{
          id:e.id,
          name: e.name,
          background_image: e.background_image,
          genres: e.genres.map(e=>e.name),
          rating: e.rating,   
       } 
    })   
    return data; 
};
const get3= async () =>{
    const resp= await axios(`${API}${API_KEY}&page=3`)
    const data = await resp.data.results.map(e =>{
       return{
          id:e.id,
          name: e.name,
          background_image: e.background_image,
          genres: e.genres.map(e=>e.name),
          rating: e.rating,   
       } 
    })   
    return data; 
};
const get4= async () =>{
    const resp= await axios(`${API}${API_KEY}&page=4`)
    const data = await resp.data.results.map(e =>{
       return{
          id:e.id,
          name: e.name,
          background_image:e.background_image,
          genres: e.genres.map(e=>e.name),
          rating: e.rating,   
       } 
    })   
    return data; 
};
const get5= async () =>{
    const resp= await axios(`${API}${API_KEY}&page=5`)
    const data = await resp.data.results.map(e =>{
       return{
          id:e.id,
          name: e.name,
          background_image:e.background_image,
          genres: e.genres.map(e=>e.name),
          rating: e.rating,  
       } 
    })   
    return data; 
};

const infodb= async()=>{
   const getDb = await Videogame.findAll({
      include: [{
      model: Genres,
      attributes:["name"],
      through: { attributes: [] },
      }]
    });
   
   let aux= []
   
   getDb.forEach( v=>{
      aux.push({
         id: v.id,
         name:v.name,
         description: v.description,
         background_image:v.background_image,
         genres: v.Genres.map(v=>v=v.name+" "),
         rating: v.rating,
         plataforms:v.platforms})
   })
   return aux

}

const getVg= async () =>{

 
   let allinfo = Promise.all([get1(),get2(),get3(),get4(),get5(),infodb()]).then(
      (resultado) => {
       return [...resultado[0], ...resultado[1],...resultado[2],...resultado[3],...resultado[4],...resultado[5]];
      }
    );
   
   return allinfo


   };




const getQuery = async(name)=>{
  
   const games = await getVg()
 
   const gamesFilt = games.filter(e =>e.name.toString().toLowerCase().includes(name.toLowerCase()));
   if(gamesFilt.length === 0){
      return {message :`no se encontro el videojuego ${name}`}
  } else {

      return gamesFilt.slice(0,15) 
  }
  
  
}
const filtroId = async(id)=>{
   try {
       if(typeof id === 'string' && id.length>8 ){
      const vGame = await Videogame.findByPk(id, {
         include: [{ model: Genres,attributes: ['name'], through: {attributes: [],}}],
     })
     return vGame
   }else{
      let get = await axios.get(`${API}/${id}${API_KEY}`)
      let data = await get.data
      let nwobj = {
        id: data.id,
        name: data.name,
        background_image: data.background_image,
        genres: data.genres.map(e => e.name),
        description: (data.description),
        released: data.released,
        rating: data.rating,
        plataforms: data.platforms.map(e=> e.platform.name)
         }
         return nwobj}
   } catch (error) {
      console.log(error)
   }}
module.exports ={
    getVg,
    getQuery,
    filtroId,
}
