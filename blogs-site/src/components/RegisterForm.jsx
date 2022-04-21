import React from 'react'

const RegisterForm = ({addUser, handleNewUsername, handleNewName, handleNewPassword, newPassword, newName, newUsername}) => {
  return (
    <div className="container">
        <form onSubmit={addUser} className="form">
          <input placeholder="username" type="text" value={newUsername} onChange={({target}) => handleNewUsername(target.value)}/>
          <input placeholder="name" type="text" value={newName} onChange={({target}) => handleNewName(target.value)}/>
          <input placeholder="password" type="password" value={newPassword} onChange={({target}) => handleNewPassword(target.value)}/>
          <button>Register</button>
        </form>
        
    </div>
  )
}

export default RegisterForm