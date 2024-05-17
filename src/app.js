import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import { options }  from "../swagger/swaggerDetails.js"


const carAddSwaggerSpec = swaggerJSDoc(options)

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(carAddSwaggerSpec))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import Routes
import userRouter from "./routes/userRoutes.js"

// declare routes
app.use("/api/v1/users", userRouter)

export { app }