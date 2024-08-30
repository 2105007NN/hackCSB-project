import { useContext, useEffect, useState } from "react";
import moment from 'moment'
import CommentPopUp from "./CommentPopUp";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { AuthContext } from "../../context/AuthProvider";

// import { json } from "stream/consumers";


const Post = ({ blog }) => {
    const [date, setDate] = useState('');
    useEffect(() => {
        if (!blog.new) {
            const createdAt = moment(blog.created_at).add(6, 'hours').format('DD-MM HH:mm'); // Parse the date
            setDate(createdAt);
        }

        else {
            setDate(blog.created_at)
        }
    },[blog.blog_id])

    const [isVisible, setIsVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useContext(AuthContext);
    // console.log(user)
    const [likes, setLikes] = useState(blog.like_count);

    useEffect(() => {
        fetch(`http://localhost:3000/blog/${blog?.blog_id}/${user?.id}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res.data)
                if (res.data === null || res.data === undefined || res.data.length === 0 || res.data[0]?.isLiked === 0) {
                    setIsLiked(false)
                } else {
                    setIsLiked(true)
                }
            })
    }, [blog?.blog_id, user?.id])

    const toggle = () => {
        setIsVisible(!isVisible);
    }

    const likeHandle = async () => {
        isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        setIsLiked(!isLiked);
        try {
            const response = await fetch(`http://localhost:3000/blog/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    blog_id: blog.blog_id,
                    user_id: user?.id
                })
            });


            if (response.ok) {
                console.log('Done')
            }

        } catch (err) {

        }

    }
    return (
        <div className="w-4/5 mx-1  rounded-lg shadow-md p-4 my-4 justify-left bg-gray-800 text-white">
            <div className="flex items-center mb-4">
                <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="ml-3">
                    <h4 className="text-sm text-white font-bold">{blog.username}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{date}</p>
                    <p className="text-xs">*{blog.category}</p>
                </div>
            </div>
            <p className="mb-4 text-sm text-white">{blog.content}</p>
            {
                likes > 0 && <p className="pb-2">{likes} Likes</p>
            }
            <div className="flex justify-between text-sm text-gray-500 ">
                {
                    user && <button className={isLiked ? 'flex text-blue-500 hover:bg-gray-700' : 'flex hover:bg-gray-700'} onClick={likeHandle}>
                        {/* <SlLike className={`transition-colors ${isLiked ? 'text-blue-500' : ''
                            }`} /> */}
                        {
                            isLiked === false &&
                            <BiLike />
                        }
                        {
                            isLiked === true &&
                            <BiSolidLike></BiSolidLike>
                        }
                        <p className="px-2  -mt-1 font-semibold ">Like</p>
                    </button>
                }


                <button onClick={toggle} className="flex hover:bg-gray-700">
                    <FaRegComment />
                    <p className="px-2 -mt-1 font-semibold">Comments</p>
                </button>

                <CommentPopUp
                    isVisible={isVisible}
                    onClose={toggle}
                    blog_id={blog.blog_id}
                ></CommentPopUp>
            </div>
        </div>
    );
};

export default Post;
