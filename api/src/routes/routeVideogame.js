const express = require("express");
const router = express.Router();
const { Videogame, Genres } = require("../db");

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      genres,
    } = req.body;

    const videogamePost = await Videogame.create({
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
    });
    
    let genreDb = await Genres.findAll({
      where: { name: genres },
    });

    videogamePost.addGenres(genreDb);

    res.send("videojuego creado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
