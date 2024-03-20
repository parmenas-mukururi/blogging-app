import React from 'react';
import "./NavbarStyles.scss";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import write from "../../assets/icons/write.svg"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/" className='link'><h3>BloomBlogs</h3></Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=technology"><h4>Technology</h4></Link>
          <Link className='link' to="/?cat=health"><h4>Health</h4></Link>
          <Link className='link' to="/?cat=entertainment"><h4>Entertainment</h4></Link>
          <Link className='link' to="/?cat=political"><h4>Political</h4></Link>
          <Link className='link' to="/?cat=business"><h4>Business</h4></Link>
        </div>
        {currentUser ? (
          <>
            <div className="auth-buttons">
              <span>Welcome {currentUser.username}</span>
              <Link className='link' to="/write">
                <div className="write">
                  <img src={write} alt="write" /><span>Write</span>
                </div>
              </Link>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="logins">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
