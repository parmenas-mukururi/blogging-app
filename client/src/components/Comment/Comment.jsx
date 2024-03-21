import React from 'react'

const Comment = () => {
  return (
    <>
<div className="comment-container">
    <div className="user-info">
        <img src={profile} alt="profile" />
        <p>John</p>
        <p>posted 3 hrs ago</p>
    </div>
    <div className="comment">
        <p>This is the comment</p>
    </div>
    <div className="reply">
        <span>Reply</span>
    </div>
</div>
    </>
  )
}

export default Comment