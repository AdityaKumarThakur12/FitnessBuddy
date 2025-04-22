const express = require("express")
const { connectingDB } = require("./db")
const app = express()
require("dotenv").config()
app.use(express.json())
const cors = require('cors');
const { userRouter } = require("./routes/user.route")
app.use(cors());

connectingDB()

app.use("/user",userRouter)


app.use((req,res)=>{
    return res.status(404).json({msg:`Route Not Found`})
})

const port = process.env.port || 8000
app.listen(port,()=>{
    console.log(`Server connected on ${port} port`)
})