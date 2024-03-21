import React, { useEffect, useState } from 'react'
import profile from '../../assets/icons/profile.svg'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import "./HomePage.scss"
import SearchByTitle from '../../components/Search/SearchByTitle'
import moment from 'moment'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const location = useLocation()
  const query = location.search

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsUrl = `http://localhost:5000/posts${query}`;
        const response = await axios.get(postsUrl)
        setPosts(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPosts()
  }, [query])

  const handleSearch = async (data) => {
    setPosts(data)
  }
  return (
    <>
    <SearchByTitle onSearch={handleSearch}/>
      {
        posts.map((post) => (
    
          <div className='post' key={post.id}>
            {post.img && <img src={post.img} alt='post image' />}
            <div className="user-info">
              <img src={profile} alt="profile" />
              {/* <p>{post.author.username}</p> */}
              <p>Posted {moment(post.createdAt).fromNow()}</p>
            </div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`}><button >Read more</button>
            </Link>
          </div>
        ))
      }

    </>
  )
}

export default HomePage