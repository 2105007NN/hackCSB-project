import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
const CommentForm = ({ setIsReplying, comment, addComment }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        console.log('submit');
        console.log(comment.blog_id);
        console.log(text); 
        console.log(comment.comment_id);
        e.preventDefault();
        addComment(comment.blog_id, text, comment.comment_id);
        setIsReplying(false);
        setText('')
    };

    const handleCancel = () => {
        setText(''); // Clear the textarea when canceling
        setIsReplying(false)
        // if (onCancelReply) {
        //     onCancelReply(); // Trigger the function to handle the reply cancellation
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className='flex'>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 border rounded-md w-full border-zinc-950 bg-gray-800"
                    placeholder="Write your reply..."
                    rows="2"
                    style={{ resize: 'none' }}
                />
                <button className="btn btn-md mt-5 bg-gray-900"
                    onClick={handleSubmit}
                >
                    <FaPaperPlane></FaPaperPlane>
                </button>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400 justify-start font-semibold">
                {/* <span className="text-gray-400 text-xs">11h</span> */}
                <span className="cursor-pointer hover:text-blue-300"
                    onClick={handleCancel}
                >Cancel</span>
                {/* <span className='cursor-pointer hover:text-blue-300'>Edit</span> */}
            </div>
        </form>
    );
};

export default CommentForm;
