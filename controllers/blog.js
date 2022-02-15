import express, { response } from "express";
import Blog from "../models/bloglist.js";
const blogsRouter = express.Router();

blogsRouter.get("/", async(req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs.map(blog => blog.toJSON()));
})


export default blogsRouter