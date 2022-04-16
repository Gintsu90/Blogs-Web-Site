import React from 'react'
import { Link, useParams } from "react-router-dom";

const Blog = ({ blogs }) => {
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)
  return (
    <>
      {blog ? 
        <div>
          <Link to="/">
          Home
          </Link>
          <p>{blog.content}</p>
      </div>
      : ""
      }
    </>
  )
}

export default Blog