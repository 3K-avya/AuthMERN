import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/lib/db.js";
import authRoute from './src/routes/authRoute.js';
import cookieParser from "cookie-parser"
import cors from 'cors';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req,res)=>{
  res.send("Backend is running");
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, ()=>{
  console.log(`Server is running at PORT:${PORT}`);
})