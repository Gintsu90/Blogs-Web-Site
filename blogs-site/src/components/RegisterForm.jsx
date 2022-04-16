import React from 'react'

const RegisterForm = () => {
  return (
    <div className="container">
        <form className="form">
          <input placeholder="username" type="text" />
          <input placeholder="name" type="text"/>
          <input type="password" placeholder="password" />
          <button>Register</button>
        </form>
        
    </div>
  )
}

export default RegisterForm