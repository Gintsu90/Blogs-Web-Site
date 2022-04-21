import React from 'react';
import Blogs from "./Blogs";

const BlogList = ({blogs}) => {
  return (
    <div className="blog-list">
        <Blogs blogs={blogs}/>
    </div>
  )
}

export default BlogList