import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";   
import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();
dotenv.config();

const port = process.env.PORT 


app.use(cookieParser())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())

app.use("/api/auth", authRoutes);





connectDb()
.then(()=>{
    app.listen(port, ()=>{
        console.log("server started!", port);

        
    })
})

