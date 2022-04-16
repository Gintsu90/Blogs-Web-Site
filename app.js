import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import blogsRouter from "./controllers/blog.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import middleware from "./utils/middleware.js";

const app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch(error => {
        logger.error("error connection to MongoDB", error.message)
    })

app.use(cors());
app.use(express.json());
app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler)

export default app