import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div className="flex flex-col gap-10">
        <h1 className="text-5xl text-center  font-bold  text-cyan-950  " style={{marginTop:"200px"}}>You Havent Created a blog ? Create your First One  </h1>
        <a className="text-3xl text-center  font-bold  text-slate-500   " href="/create-blog">click here</a>
</div>
      )}
    </div>
  );
};

export default UserBlogs;
