import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
   <>
    <h1>Register</h1>
    <form action="">
      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Username" id="username"required/>
      <label htmlFor="email">Email</label>
      <input type="email" placeholder="Email" id="email" required/>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" required/>
      <button type="submit">Register</button>
      <p>Do you have an account? <Link to="/login">Login</Link></p>

    </form>
   </>
  )
}

export default RegisterPage