import React from 'react';
import Blogs from "./Blogs";
import { Link } from "react-router-dom";

const BlogList = ({blogs}) => {
  return (
    <div className="blog-list">
        <Blogs blogs={blogs}/>
    </div>
  )
}

export default BlogList