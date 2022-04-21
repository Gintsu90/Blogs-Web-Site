import React from 'react'
import {Link} from "react-router-dom"

const Header = ({user, handleLogout}) => {
  return (
    <div className="header">
        <Link to="/"><h1>My Blogs</h1></Link>
        {user === null ?
          <>
            <Link to="login-form"><p className="login">Login</p></Link>
            <Link to="register"><p className="register">Register</p></Link>
          </>
        : 
          <>
            <Link to="add-blog" className="add-blog">Add Blog</Link>
            <p className="logout" onClick={handleLogout}>Logout</p>
          </>
        
      }
    </div>
  )
}

export default 
Header
