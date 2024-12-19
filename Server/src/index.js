import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";   
import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/updateProfile.routes.js";
import postRoutes from "./routes/post.routes.js";
import followRoutes from "./routes/follow.routes.js";
import updateRoutes from "./routes/updateProfile.routes.js";
import feedRoutes from "./routes/feed.routes.js"
import cors from "cors"
const app = express();
dotenv.config();

const port = process.env.PORT 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/user",postRoutes );
app.use("/api/user",followRoutes );
app.use("/api/profile/user",updateRoutes);
app.use("/api/user/feed", feedRoutes )





connectDb()
.then(()=>{
    app.listen(port, ()=>{
        console.log("server started!", port);

        
    })
})

