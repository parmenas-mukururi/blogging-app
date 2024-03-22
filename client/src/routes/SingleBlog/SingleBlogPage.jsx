import React, { useContext, useEffect, useState } from 'react'
import edit from "../../assets/icons/edit.svg"
import remove from "../../assets/icons/delete.svg"
import comment from "../../assets/icons/comment.svg"
import like from "../../assets/icons/like.svg"
import profile from "../../assets/icons/profile.svg"
import "./singleBlog.scss"
import { AuthContext } from '../../context/authContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
import { baseUrl } from '../../constants/baseUrl'


const SingleBlogPage = () => {

  const [post, setPost] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const postUrl = `${baseUrl}/post/${id}`

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(postUrl)
        console.log(res)
        setPost(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPost()
  }, [id])


  // const handleEdit = async () => {
  //   try {
  //     const updatedPost = await axios.put(postUrl, { withCredentials: true })
  //     setPost(updatedPost)
  //     console.log(updatedPost)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleDelete = async () => {
    try {
      await axios.delete(postUrl, { withCredentials: true })
      setPost(null)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    post &&
    <>
      <div className="blog-container">
        <h1>{post.title}</h1>
        <span><h4>{post.category}</h4></span>
        <div className="user-info">
          <div className="user">
            <img src={profile} alt="profile" />
            <p>{post.author.username}</p>
          </div>
          <p>Posted {moment(post.createdAt).fromNow()}</p>
          {currentUser && currentUser.username === post.author.username &&
            <div className="edit-delete-icons">
              <Link to={`/write?edit=${post.id}`} className='link'><img src={edit} alt="edit" /></Link>
              <img src={remove} alt="delete" onClick={handleDelete} />
            </div>
          }

        </div>
        <div className="comment-icons">
          <img src={comment} alt="comment" />
          <img src={like} alt="like" />
        </div>
        <div className="content">
          {post.content}
        </div>
      </div>

    </>
  )
}

export default SingleBlogPage