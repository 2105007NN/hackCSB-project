import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import CommentForm from './CommentForm';
import { getComments } from './CommentApi';

const ShowComment = ({ comment, blog_id, addComment }) => {
  const [comments, setComments] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [childComments, setChildComments] = useState([]);
  const [newComment, setNewComment] = useState(false);

  const handleReply = () => {
    setIsReplying(true);
  }
  const { user } = useContext(AuthContext);
  // console.log(user.id +' ' + comment.user_id)
  // console.log(user)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { comments } = await getComments(blog_id);
        setComments(comments);
      } catch (err) {
        console.log('Falied To fetch comments')
      }
    }

    fetchComments();
  }, [blog_id,addComment])





  useEffect(() => {
    const filteredChildComments = comments.filter(cmnt => cmnt.parent_id === comment.comment_id);
    setChildComments(filteredChildComments);
  }, [comments, comment.comment_id]); // Proper dependencies for filtering



  return (
    <div className={comment.parent_id ? 'bg- pl-12' : 'bg-transparent'}>
      <div className="max-w-md mx-auto mt-4 px-4 text-white rounded-xl flex  space-x-4">
        <img
          src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex-1 bg-gray-800 w-full rounded-lg px-4 py-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold">{comment.username}</h4>
            </div>
            <p className="text-sm mt-1">{comment.comment_text}</p>
          </div>
          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400 justify-between px-2 font-semibold">
            {/* <span className="text-gray-400 text-xs">11h</span> */}
            {/* <span className="cursor-pointer hover:text-blue-300">Like</span> */}
            {
              user && 
              <span className="cursor-pointer hover:text-blue-300">Like</span>
            }
            {/* <span className='cursor-pointer hover:text-blue-300'>Edit</span> */}
            {
              user && user.id === comment.user_id && <span className='cursor-pointer hover:text-blue-300'>
                Edit
              </span> 
            }
            {
              user && <span className="cursor-pointer hover:text-blue-300 "
                onClick={handleReply}
              >Reply</span>
            }
          </div>
          {
            isReplying &&
            <div className='space-x-2 mt-2 ml-4'>
              <CommentForm setIsReplying={setIsReplying} comment={comment} addComment={addComment}></CommentForm>
            </div>
          }
        </div>
      </div>
      {
        childComments.map(childComment => {
          return (
            <ShowComment key={comment.comment_id} comment={childComment} blog_id={blog_id} addComment={addComment} getComments={getComments}></ShowComment>
          )
        })
      }
    </div>
  );
};

export default ShowComment;
