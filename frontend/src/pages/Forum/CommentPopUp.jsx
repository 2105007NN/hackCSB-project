import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ShowComment from './ShowComment';
import { AuthContext } from '../../context/AuthProvider';
// import CommentForm from './CommentForm';
import { FaPaperPlane } from 'react-icons/fa';
import { getComments } from './CommentApi';
// import { get } from 'http';
// import { get } from 'http';

const CommentPopUp = ({ isVisible, onClose, blog_id }) => {
  if (!isVisible) return null;
  const [comments, setComments] = useState([])
  // const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const { user } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [cmnt, setCmnt] = useState('');
  const [first, setFirst] = useState(false);
  // console.log(user)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { comments, author } = await getComments(blog_id);
        setAuthor(author);
        setComments(comments);
        setFirst(comments.length === 0 ? true : false)
        console.log(comments)
        console.log(author)
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [blog_id]);

  // getComments(blog_id);



  const handleSubmit = (blog_id, comment_text, parent_id) => {
    setCmnt('');
    addComment(blog_id, comment_text, parent_id)
  }

  /**
   * add Comment Functin 
   */




  const addComment = async (blog_id, comment_text, parent_id) => {
    setFirst(false)
    const newComment = {
      user_id: user?.id,
      username: user?.username,
      blog_id: blog_id,
      comment_text: comment_text,
      parent_id: parent_id
    }
    if (!user || comment_text === '') {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    try {
      const response = await fetch(`http://localhost:3000/blog/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user?.id,
          blog_id: blog_id,
          comment_text: comment_text,
          parent_id: parent_id,
        })
      })
    } catch (err) {
      console.log(err);
    }
    setComments([newComment, ...comments])
  }








  const rootComments = comments.filter(comment => comment.parent_id === null);
  // console.log(rootComments)

  return (
    <div className="fixed inset-0 bg-gray-900  bg-opacity-50 flex justify-center items-center z-55">
      {/* <CommentForm></CommentForm> */}
      <div className="bg-gray-900 rounded-lg w-full h-4/5 max-w-md p-4">
        <button className="text-gray-500 hover:text-gray-800 float-right" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-lg text-white font-semibold mb-4 text-center ">{author}'s Post</h2>
        {
          user && first && <h3 className='text-center font-semibold text-white'>Be the first to Comment!!</h3>
        }
        {
          !user && first && <h3 className='text-center font-semibold text-white'>No comments to see!!</h3>
        }
        {showAlert && (
          <div role="alert" className="alert alert-info mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            <span>Comment Field Should not be empty!!</span>
            <FontAwesomeIcon icon={faTimes}
            onClick={()=>setShowAlert(false)}
            style={{ cursor: 'pointer' }}
            ></FontAwesomeIcon>
          </div>
        )}




        <div className="overflow-y-auto max-h-96">
          {
            user &&
            <div className='flex'>
              <textarea
                type="text"
                placeholder="Write a comment..."
                rows={3}
                style={{ resize: 'none' }}
                className=" w-full p-2 mt-4 bg-gray-800 rounded-md"
                onChange={e => setCmnt(e.target.value)}
                value={cmnt}
              />
              {/* <button className=''>reply</button> */}
              {/* <button className="btn btn-outline btn-accent m-2">Accent</button> */}
              <button className="btn btn-xs mt-5 mx-1"
                onClick={() =>
                  handleSubmit(blog_id, cmnt, null)}>
                <FaPaperPlane size={20}></FaPaperPlane>
              </button>
            </div>

          }




          {rootComments.map((comment) => (
            <ShowComment
              key={comment.comment_id}
              comment={comment}
              blog_id={blog_id}
              addComment={addComment}
            // getComments={getComments}
            ></ShowComment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentPopUp;
