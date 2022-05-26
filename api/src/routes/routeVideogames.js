const express = require("express");
const router = express.Router();
const { getVg, getQuery, filtroId} = require("../controllers/controlVG");

router.get("/", async (req, res) => {
  try {
    const {name} = req.query;  
    
    if (!name) {
      const getTodo = await getVg();
      res.send(getTodo);
    } else {
      const getquery = await getQuery(name);
      res.send(getquery);
    }
  } catch (error) {
    console.log(error);
  
   
  }
});

router.get("/:id", async (req, res) => {
  try {
      const{id}=req.params
      const filtroid = await filtroId(id)
      res.json(filtroid)  
  } catch (error) {
      console.log(error)
  }
});

module.exports = router;
