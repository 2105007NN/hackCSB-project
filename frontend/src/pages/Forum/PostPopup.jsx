import React, { useContext, useState } from 'react';
import dayjs from 'dayjs'
import { AuthContext } from '../../context/AuthProvider';
// import { MdOutlineClear } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Posts from './Posts';
import { BlogContext } from './BlogContext';
import moment from 'moment';
// import {createPost} from './Posts'




const PostPopup = ({ isVisible, onClose }) => {
    const { blogs, setBlogs } = useContext(BlogContext)
    const { user } = useContext(AuthContext);
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

    const handlePost = async () => {
        const createdAt = moment(); // Parse the date
        console.log(createdAt);
        console.log(createdAt.format('DD-MM HH:mm'))
        const newBlog = {
            username: user?.username,
            user_id: user?.id,
            category: category,
            content: content,
            like_count: 0,
            created_at: createdAt.format('DD-MM HH:mm'),
            new : true
        }

        // setBlogs(newBlog,...blogs);
        setBlogs(blogs => [newBlog, ...blogs]);

        // Show alert if category or content is empty
        if (category === "" || !content) {
            setShowAlert(true);
            return;
        }

        // Hide alert if category and content are provided
        setShowAlert(false);

        try {
            const response = await fetch(`http://localhost:3000/blog/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    category: category,
                    content: content
                })
            });

            if (response.ok) {
                onClose(); // Close popup on successful post
            }
        } catch (err) {
            console.log(err);
        }

    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg w-full max-w-md p-4">
                <button className="text-gray-500 hover:text-gray-800 float-right" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2 className="text-3xl font-bold mb-4 text-orange-300 text-center">Make a Post!!</h2>

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
                        <span>Please fill in all fields before posting.</span>
                    </div>
                )}

                <select
                    className="select select-primary w-full  bg-gray-800 border-gray-800 text-white font-semibold"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Put your post in a category
                    </option>
                    <option>Anxiety</option>
                    <option>Depression</option>
                    <option>Autism</option>
                    <option>ADHD</option>
                    <option>Schizophrenia</option>
                    <option>PTSD</option>
                    <option>Randoms</option>
                </select>

                <textarea
                    type="text"
                    placeholder="Write your problems..."
                    style={{ resize: 'none' }}
                    rows={10}
                    className="bg-gray-800 select-primary w-full p-2 mt-4 rounded-lg text-white font-semibold flex grow-1"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button className='btn btn-primary justify-center items-center mt-3 w-full text-lg' onClick={handlePost}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostPopup;
