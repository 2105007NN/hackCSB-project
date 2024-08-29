import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Comment from './Comment';
import SingleComment from './SingleComment';

const SingleBlog = () => {
    const blog = useLoaderData(); 
    const {user} = useContext(AuthContext);
    const user_id = user?.id;
    const [comments,setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     fetch(`http://localhost:5002/blog_comments/${blog.blog_id}`)
    //     .then(res => res.json())
    //     .then(data =>setComments(data))
    //     .then(setLoading(false))
    // },[])

    console.log(blog)

    return (
    <div className='p-5 w-[88%] m-auto'>
      <div className='bg-indigo-50 p-5'>
        <h2 className='text-3xl font-semibold text-indigo-950'>{blog?.blog_title}</h2>
        <p className=''>{blog?.blog_content}</p>
      </div>
       
        {/* <Comment blog={blog}/> */}
     
    </div>
  )
}

export default SingleBlog;