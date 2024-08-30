// src/utils/api.js
export const getComments = async (blog_id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/comments/${blog_id}`);
      const data = await response.json();
      console.log(data.data.data)
      console.log(data.data.author[0].username)
      return {
        comments: data?.data?.data || [],
        author: data?.data?.author[0].username || '',
      };
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      return {
        comments: [],
        category: '',
      };
    }
  };
  