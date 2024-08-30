import { createContext, useState } from "react";


const BlogContext = createContext([])

const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    return (
        <BlogContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogContext.Provider>
    )
}

export { BlogContext, BlogProvider }