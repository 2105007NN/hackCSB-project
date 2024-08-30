import React, { useEffect, useState, useContext } from 'react'
import Post from './Post'
import { CategoryContext } from './CategoryContext';
import { SearchContext } from './SearchContext';
import { AuthContext } from '../../context/AuthProvider';
import { BlogContext } from './BlogContext';
// import { CLIENT_RENEG_LIMIT } from 'tls';

// const [blogs,setBlogs] = useState([]);

function Posts() {
  const {blogs, setBlogs} = useContext(BlogContext);
  // const [blogs,setBlogs] = useState([]);
  const { search } = useContext(SearchContext);
  // const {user}  = useContext(AuthContext)
  const { category, setCategory } = useContext(CategoryContext)


  useEffect(() => {
    if (category === 'all') {
      setCategory(null)
    }
    const url = category ? `http://localhost:3000/blogs/${category}` : `http://localhost:3000/blogs`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setBlogs(res.data)
      })
  }, [category])

  // newBlog && setBlogs([newBlog, ...blogs])

  const Blogs = blogs.filter(post => {
    return post.content.toLowerCase().includes(search.toLowerCase()) || post.category.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <div className=' flex-grow-1 w-screen'>
      {
        Blogs.map(blog => {
          // console.log(blog);
          return (
            <div key={blog.blog_id}>
              <Post blog={blog} ></Post>
            </div>
          )
        })
      }

    </div>
  )
}

export default Posts;