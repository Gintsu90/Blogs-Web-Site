import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const usersRouter = express.Router()

usersRouter.get("/", async(req, res) => {
    const users = await User
        .find({}).populate("blogs", { title: 1, author: 1, content: 1, likes: 1});
    res.json(users);
})

usersRouter.post("/", async(req, res) => {
    const {username, name, password} = req.body;

    const existingUser = await User.findOne({ username })
    if(existingUser) {
        return res.status(400).json({
            error: "username must be unique"
        })
    }
    if(password.length < 6) {
        res.status(400).json({ 
            error: "password must be at least 6 characters long" 
        })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save()

    res.status(201).json(savedUser);
});

export default usersRouter
