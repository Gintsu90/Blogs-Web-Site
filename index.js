import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())

app.listen(PORT);
console.log(`Server running on ${PORT}`)