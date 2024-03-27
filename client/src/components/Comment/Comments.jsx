import React, { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../constants/baseUrl';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./comment.scss"

const Comments = ({post_id}) => {
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`${baseUrl}/comments/${post_id}`);
                setComments(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, []);

    const handleCommentSubmit = async () => {
        try {
            console.log({newComment})
            const res = await axios.post(`${baseUrl}/comments`, { content: newComment, post_id }, {withCredentials: true});
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="comments">
            {currentUser ? (
                <div className="write">
                    <div className="write-comment-container">
                        <input
                            type="text"
                            value={newComment}
                            id="comment"
                            placeholder="Write your comment..."
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="send-button">
                            <button onClick={handleCommentSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="login-redirect">
                    <h3>Please login to view comments section</h3>
                    <Link to="/login" className="link">
                        Login Here
                    </Link>
                </div>
            )}

            <div className="comments-list">
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="user-info">
                            <img src={comment.author.profilePicture} alt="User" />
                            <span>{comment.author.username}</span>
                            <span>Posted {moment(comment.createdAt).fromNow()}</span>
                        </div>
                        <div className="commentText">
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
