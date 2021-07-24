const express = require("express");
const db = require("./db")
const app = express();
const port = process.env.PORT || 3006; 
const router = require("./router");
const cors = require('cors');

//middelwares
app.use(cors());
app.use(express.json());
app.use(router);
db
.then(()=>{
  //Starting server

   app.listen(port, ()=> console.log(`Servidor levantado en http://localhost:${port}`));
  })
  .catch((err)=> console.log(err.message));   
