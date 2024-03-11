import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
    <h1>Login</h1>
    <form action="">
      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Username" id="username"/>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" />
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
    </>
  )
}

export default LoginPage