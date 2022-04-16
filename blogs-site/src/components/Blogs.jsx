import React from 'react'
import {Link} from "react-router-dom"

const Blogs = ({blogs}) => {
  return (
    <>
        {blogs.map((blog) => {
            return (
                <Link key={blog.id} to={blog.id}>
                  <div key={blog.id} className="blog">
                      <h3>{blog.title}</h3>
                      <p>{blog.author}</p>
                      <p>likes: {blog.likes}</p>
                  </div>
                </Link>
            )

            
        })}
    </>
  )
}

export default Blogs