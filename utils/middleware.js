import logger from "./logger.js";
import jwt from "jsonwebtoken";

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    if(error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message});
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
            error: "invalid token"
        })
    } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({
            error: "token expired"
        })
    }

    next(error)
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer")) {
        req.token = authorization.substring(7)
    }
     
    next()
}

const userExtractor = (req, res, next) => {
    const decoded = jwt.verify(req.token, process.env.SECRET);
    if(!decoded.id) {
        return res.status(401).json({ error: "token missing or invalid" });
    }
    req.user = decoded;
    
    next();
}

export default {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}