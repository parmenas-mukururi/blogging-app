import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './writeBlog.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const WriteBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handlePublish = async () => {
    try {
      const res = await axios.post('http://localhost:5000/posts', { title, content, category }, { withCredentials: true });
      console.log(res.data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
if(!currentUser) {
  return navigate("/login")
}
  },[currentUser])

  return (
    currentUser ? 
    <div className="blog">
      <div className="editor">
        <input type="text" value={title} placeholder="Title" onChange={handleTitleChange} />
        <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
      </div>
      <div className="menu">
        <div className="publish">
          <button onClick={handlePublish}>Publish</button>
        </div>
        <div className="category">
          <h2>Category</h2>
          <div className="technology">
            <input type="radio" checked={category === 'technology'} name="category" id="technology" value="technology" onChange={handleCategoryChange} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="science">
            <input type="radio" checked={category === 'science'} name="category" id="science" value="science" onChange={handleCategoryChange} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="lifestyle">
            <input type="radio" checked={category === 'lifestyle'} name="category" id="lifestyle" value="lifestyle" onChange={handleCategoryChange} />
            <label htmlFor="lifestyle">Lifestyle</label>
          </div>
          <div className="health">
            <input type="radio" checked={category === 'health'} name="category" id="health" value="health" onChange={handleCategoryChange} />
            <label htmlFor="health">Health</label>
          </div>
          <div className="food">
            <input type="radio" checked={category === 'food'} name="category" id="food" value="food" onChange={handleCategoryChange} />
            <label htmlFor="food">Food</label>
          </div>
          <div className="business">
            <input type="radio" checked={category === 'business'} name="category" id="business" value="business" onChange={handleCategoryChange} />
            <label htmlFor="business">Business</label>
          </div>
        </div>
      </div>
    </div>
    :
    <div>
      <span>Login</span>
    </div>
  );
};

export default WriteBlogPage;
