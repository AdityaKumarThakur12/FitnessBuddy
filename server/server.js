require("dotenv").config()
const express = require("express")
const { connectingDB } = require("./db");
const cors = require('cors')
const exerciseRoutes = require('./routes/exerciseRoutes')
const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/exercise', exerciseRoutes)


connectingDB()



const port = process.env.port || 8080
app.listen(port,()=>{
    console.log(`Server connected on ${port} port`)
})