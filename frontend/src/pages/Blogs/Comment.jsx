import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SingleComment from "./SingleComment";

const Comment = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5002/blog_comments/${blog.blog_id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const postComment = async () => {
    if (user) {
      fetch("http://localhost:5002/blog_comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blog_id: blog.blog_id,
          user_id: user.id,
          comment_text: commentBody,
          comment_date: new Date(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Reload the page to see the new comment
          //window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const newComment = {
        blog_id: blog.blog_id,
        user_id: user.id,
        comment_text: commentBody,
        comment_date: new Date(),
      };
      setCommentBody("");
      setComments([...comments, newComment]);
    } else if (user === null) {
      alert("You must be logged in to comment");
      setCommentBody("");
    }
  };

  return (
    <div>
      <div className="text-5xl ml-40  md-10 text-black"></div>
      <section className="background-color: #eee">
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="flex items-center bg-indigo-100 p-3">
                  <a href="#!" className="me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="">Like</p>
                  </a>
                  <a href="#!" className=" me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="">Comment</p>
                  </a>
                  <a href="#!" className="me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="">Share</p>
                  </a>
                </div>
              </div>

              <div
                className="card-footer py-3 border-0"
                style={{ background: "#f8f9fa" }}
              >
                <div className="flex items-center gap-4 w-[100%] p-3">
                  <img
                    className="rounded-full shadow-1-strong size-20"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                    alt="avatar"
                  />
                  <div className="form-outline w-[100%]">
                    <label
                      for="message"
                      class="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      value={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-2 p-2 ">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={postComment}
                  >
                    Post comment
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* displaying comments   */}
          </div>

          <div className="mt-10">
            {comments.map((comment) => (
              <SingleComment comment={comment} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comment;