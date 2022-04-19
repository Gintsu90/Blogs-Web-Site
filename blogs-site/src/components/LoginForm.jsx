
const Login = ({handleLogin, handleUsername, handlePassword, password, username, user}) => {


  return (
    <>
      {user === null ?
        <div className="container">
        <form className="form" onSubmit={handleLogin}>
          <input
          className="username"
          type ="text"
          placeholder="username" 
          value={username}
          name="Username"
          onChange={({ target }) => handleUsername(target.value)}
          />
          <input
          className="password"
          type="password" 
          placeholder="password" 
          value={password}
          name="Password"
          onChange={({ target }) => handlePassword(target.value)}/>
          <button type="submit">Login</button>
        </form>
      </div>
      : <p>{user.name} logged in</p>
    }
    </>
    
  )
}

export default Login