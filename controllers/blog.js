import express from "express";
import Blog from "../models/bloglist.js";
import User from "../models/user.js";
import middleware from "../utils/middleware.js";
const blogsRouter = express.Router();


blogsRouter.get("/", async(req, res) => {
    const blogs = await Blog
        .find({}).populate("user", { username: 1, name: 1 });
    res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", middleware.userExtractor, async(req, res) => {
    
    
    const user = await User.findById(req.user.id)

    const blog = new Blog({
        title: req.body.title,
        author: user.username,
        content: req.body.content,
        likes: req.body.likes,
        user: user._id

    })
    const addBlog = await blog.save();
    user.blogs = user.blogs.concat(addBlog._id)
    await user.save();
    console.log(user)
    res.json(addBlog);
});

blogsRouter.put("/:id", middleware.userExtractor, (req, res) => {
    const body = req.body;
    const user = User.findById(req.user.id)

    const blog = {
        title: body.title,
        author: user.username,
        content: body.content,
        likes: body.likes,
        user: user._id,
    };
    
    Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    .then(updatedBlog => {
        console.log(updatedBlog)
        res.json(updatedBlog);
    })
})

blogsRouter.delete("/:id",middleware.userExtractor, async(req, res) => {

    const user = req.user.id
    const blog = await Blog.findById(req.params.id);

    if(blog.user.toString() === user.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})


export default blogsRouter