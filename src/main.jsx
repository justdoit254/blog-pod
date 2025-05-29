import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
//Components
import Home from "./pages/Home.jsx";
import AllBlogs from "./pages/AllBlogs.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Logout from "./pages/Logout.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "all-blogs", Component: AllBlogs },
      { path: "add-blog", Component: AddBlog },
      { path: "auth/login", Component: Login },
      { path: "auth/signup", Component: Signup },
      { path: "profile", Component: Profile },
      { path: "logout", Component: Logout },
      { path: "blog/:slug", Component: SingleBlog },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
