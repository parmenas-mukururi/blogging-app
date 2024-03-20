import React, { useContext, useState } from 'react'
import "./Login.scss"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
const LoginPage = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const [err, setError] = useState(null)
  const handleChange = (e) => {
    setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }))
    // console.log(inputs)
  }

  const handleSubmit = async (e) => {
    console.log(inputs)
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/login", inputs, {withCredentials: true}) ;
      // const res = await fetch("http://localhost:5000/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(inputs),
      // })
      
      console.log(res.data)
      const data = res.data;
      console.log('Data ', data);
      setCurrentUser(data)
      navigate('/')

    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form className='login-form'id='login'>
        <label htmlFor="email">Email</label>
        <input required type="email" placeholder="Email" id="email" name='email' value={inputs.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input required type="password" placeholder="Password" id="password" name='password' onChange={handleChange} />
        {err && <p className='error'>{err}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </>
  )
}

export default LoginPage