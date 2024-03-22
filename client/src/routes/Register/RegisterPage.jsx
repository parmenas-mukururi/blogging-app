import React, { useState } from 'react'
import "./Register.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [err, setError] = useState(null)
  const handleChange = (e) => {
    setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }))
    // console.log(inputs)
  }

  const handleRegister = async (e) => {
    console.log(inputs)
    e.preventDefault()
    try {
      await axios.post(`${baseUrl}/register`, inputs, {withCredentials: true})
      navigate('/login')

    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form className='register-form'id='register'>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" id="username" name='username' onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" id="email" name='email' onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name='password' onChange={handleChange} required />
        {err  && <p className='error'>{err}</p>}
        <button type="submit" onClick={handleRegister}>Register</button>
        <p>Do you have an account? <Link className='link' to="/login">Login</Link></p>

      </form>
    </>
  )
}

export default RegisterPage