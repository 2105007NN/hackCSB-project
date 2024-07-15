import React from 'react';
import {Link} from 'react-router-dom';


const Blog = ({ blog }) => {

    return (
        <div className='card rounded-lg flex flex-col card-side shadow-2xl bg-green-200 hover:bg-blue-200 mb-4'>
           <div className="card rounded-lg flex flex-col card-side shadow-2xl bg-green-200 hover:bg-blue-200">
          <figure className='rounded-none'>{/**image_url? image_url : */}
            <img className="h-[300px] rounded-t-lg z-100" src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyfGVufDB8fDB8fHww"}  alt="courses" />
          </figure>
        <div className="card-body h-[300px] p-4">
          <h2 className="card-title text-3xl">{blog.blog_id}</h2>
          <p>{blog.blog_title}</p>
          <div className="flex card-action justify-between mt-5">
            {/* <UpdateCourse key={course_id} course = {course}/> */}
            {/* <button onClick={()=>handleDelete(course_id)} className="w-24 btn bg-blue-300 btn-primary">Delete</button> */}
            <Link to={`/blogs/${blog.blog_id}`}><div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">READ</span>
            </div></Link> 
            </div>
          </div>
        </div>
        </div>
    );
}

export default Blog;