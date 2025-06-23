import React, { useEffect, useState } from "react";
import VerticalPreviewCard from "../components/VerticalPreviewCard";
import dbService from "../services/database";
import { useNavigate } from "react-router";
import { useToast } from "../context/ToastContext";
import HorizontalPreviewCard from "../components/HorizontalPreviewCard";

const AllBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { showToast } = useToast();
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const allBlogs = await dbService.getPosts();
        setBlogs(allBlogs?.documents);
      } catch (error) {
        //if api fails navigate to home
        showToast("Failed to fetch blogs", "error");
        navigate("/");
      }
    };
    fetchAllBlogs();
  }, []);
  return (
    <div className="my-12">
      <h1 className="uppercase text-7xl font-bold text-center py-4">
        All Blogs
      </h1>
      <div className="my-12 mx-24">
        <HorizontalPreviewCard blog={blogs[0]} />
      </div>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-14 my-2 auto-rows-fr">
        {blogs.slice(1)?.map((blog) => (
          <VerticalPreviewCard key={blog?.$id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
