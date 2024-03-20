import React, { useEffect, useState } from 'react'
import profile from '../../assets/icons/profile.svg'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import "./HomePage.scss"

// const posts = [
//   {
//     id: 1,
//     title: 'Post 1',
//     img: "https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 2,
//     title: 'Post 2',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 3,
//     title: 'Post 3',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 4,
//     title: 'Post 4',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 5,
//     title: 'Post 5',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 6,
//     title: 'Post 6',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 7,
//     title: 'Post 7',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 8,
//     title: 'Post 8',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 9,
//     title: 'Post 9',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   },
//   {
//     id: 10,
//     title: 'Post 10',
//     img: "https://www.pexels.com/photo/a-bubble-is-floating-in-the-sky-over-trees-20066389/",
//     body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   }
// ]
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

 
  return (
    <>
      {
        posts.map((post) => (
          <div className='post' key={post.post_id}>
            <img src={post.img} alt='post image' />
            <div className="user-info">
              <img src={profile} alt="profile" />
              <p>John</p>
              <p>posted 3 hrs ago</p>
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