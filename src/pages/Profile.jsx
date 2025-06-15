import React, { useContext } from "react";
import Button from "../components/Button";
import authService from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setLoading, setUserData, setIsLoggedIn } =
    useContext(AuthContext);

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      authService.logout();
      setUserData(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center mt-4">
      <h2 className="text-4xl font-bold mb-6 text-(--white-text-color)">
        Blogs published by you
      </h2>
      <p>{userData?.name}</p>
      <Button
        className="border-(--dark--card-hover) text-2xl text-(--white-text-color) mb-16"
        onClick={handleFormSubmit}
      >
        {"LOG OUT"}
      </Button>
    </div>
  );
};

export default Profile;
