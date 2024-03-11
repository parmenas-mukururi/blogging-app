import React from 'react'
import Blog from '../../components/BlogComponent/Blog'
import "./HomePage.scss"
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
     <Link to="/post/:id" className='link'>
      <Blog/>
     </Link>
    </>
  )
}

export default HomePage