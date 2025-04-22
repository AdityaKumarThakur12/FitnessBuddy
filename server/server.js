const express = require("express")
const { connectingDB } = require("./db")
const app = express()
require("dotenv").config()
app.use(express.json())


connectingDB()

app.use((req,res)=>{
    return res.status(404).json({msg:`Route Not Found`})
})

const port = process.env.port || 8080
app.listen(port,()=>{
    console.log(`Server connected on ${port} port`)
})