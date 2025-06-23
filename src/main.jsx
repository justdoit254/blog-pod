import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
//Components
import Home from "./pages/Home.jsx";
import AllBlogs from "./pages/AllBlogs.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import Profile from "./pages/Profile.jsx";
import Logout from "./pages/Logout.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import SignupLogin from "./pages/SignupLogin.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import fetchBlog from "./helpers/blogLoader.js";
import BlogNotFound from "./components/BlogNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "all-blogs", Component: AllBlogs },
      { path: "add-blog", Component: AddBlog },
      { path: "auth/login", element: <SignupLogin mode="login" /> },
      { path: "auth/signup", element: <SignupLogin mode="signup" /> },
      { path: "profile", Component: Profile },
      { path: "logout", Component: Logout },
      {
        path: "blog/:id",
        Component: SingleBlog,
        loader: fetchBlog,
        errorElement: <BlogNotFound />,
      },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </AuthContextProvider>
);
