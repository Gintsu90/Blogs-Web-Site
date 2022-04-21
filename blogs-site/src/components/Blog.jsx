import React from 'react'
import { useParams } from "react-router-dom";

const Blog = ({ blogs, user, addLike }) => {
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)
  console.log(blog)
  return (
    <>
      {blog ? 
        <div className="blog-view">
          <h1>{blog.title} </h1>
          <p>{blog.content}</p>
          {user !== null && user.username !== blog.user.username ? 
            <span onClick={() => addLike(blogId)} className="material-icons">
              thumb_up
            </span>
          : ""
          }
        </div>
      : ""
      }
    </>
  )
}

export default Blog