import React, { useEffect } from "react";
import { useToast } from "../context/ToastContext";

const Home = () => {
  const { showToast } = useToast();
  useEffect(() => {
    showToast("Account created successfully", "success");
  }, []);
  return <div>Home</div>;
};

export default Home;
