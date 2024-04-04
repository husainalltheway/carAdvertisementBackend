// require ('dotenv').config({path: './env'})
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})
const app = express();
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.timeLog(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err)
})
