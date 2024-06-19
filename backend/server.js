
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDB.js";


const app=express();
const PORT= process.env.port || 5000;

dotenv.config();


app.use(express.json());  //to parse the incoming requets with JSON payloads
app.use(cookieParser()); //to extract the token from the cookie


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);




 app.listen(PORT,()=> {
    connectToMongoDb();
    console.log(`server is running on port ${PORT}`);
});