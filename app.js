import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import userRouter from "./routes/user.js"
import adminRouter from "./routes/admin.js"

export const app = express() 
config({
    path: "./data/config.env"
})

//middlewares
app.use(express.json())
app.use(cookieParser())


//using routers
app.use("/api/v1/user/", userRouter)
app.use("/api/v1/admin/", adminRouter)

// app.get("/", (req, res)=>{
//     res.json({
//         success: true,
//         message: "application working"
//     })
// })