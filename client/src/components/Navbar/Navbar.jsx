import React from 'react'
import "./NavbarStyles.scss"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <h3>BloomBlogs</h3>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=sports"><h4>Sports</h4></Link>
          <Link className='link' to="/?cat=health"><h4>Health</h4></Link>
          <Link className='link' to="/?cat=entertainment"><h4>Business</h4></Link>
          <Link className='link' to="/?cat=political"><h4>Political</h4></Link>
          <Link className='link' to="/?cat=business"><h4>Business</h4></Link>
        </div>
        <div className="logins">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </>
  )
}

export default Navbar