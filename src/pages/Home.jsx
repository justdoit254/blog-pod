import React, { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import VerticalPreviewCard from "../components/VerticalPreviewCard";
import HorizontalPreviewCard from "../components/HorizontalPreviewCard";
import dbService from "../services/database";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { Query } from "appwrite";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const allBlogs = await dbService.getPosts([
          Query.equal("active", true),
          Query.limit(4),
        ]);
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
        Blogs & Resources
      </h1>
      <div className="my-12 mx-24">
        <HorizontalPreviewCard blog={blogs[0]} />
      </div>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-14 my-2 auto-rows-fr">
        {blogs.slice(1).map((blog) => (
          <VerticalPreviewCard key={blog?.$id} blog={blog} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-15">
        <Button
          children={"Browse all blogs"}
          className="hover:shadow-lg hover:bg-(--lime) hover:text-(--dark--grey)"
          onClick={() => navigate("/all-blogs")}
        />
      </div>
    </div>
  );
};

export default Home;
