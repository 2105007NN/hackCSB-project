import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setblogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/blogs")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data.data)) {
                setblogs(data.data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(blogs)) {
        return <p>Fetched data is not an array</p>;
    }
    console.log(blogs.length)

    return (
        <div className='w-[90%] m-auto'>
            <div className='text-4xl pb-5 text-black '>
                <p className='text-indigo-600'> All blogs ( {blogs.length} )</p>
            </div>
            <div className='grid grid-cols-4 gap-10 bg-white m-auto'>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        </div>
    )
}

export default Blogs;
