const express = require("express");
const router = express.Router();
// const {getGen} = require('../controllers/controlGEN')
const {Genres} = require('../db');

router.get('/', async (req, res) => {
try {
    const res3 = await Genres.findAll()
    return res.send(res3);

} catch (error) {
    console.log(error)   
}

});




module.exports = router;