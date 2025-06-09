import { Link } from "react-router";
import NavItem from "./NavItem";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="sticky top-0 z-50 bg-(--dark) flex justify-between items-center max-w-lvw px-15 py-6 border-b border-[#ffffff25]">
      <Link to="/">
        <img
          src="https://cdn.prod.website-files.com/66e5d487af6fa0a77ea6c4ee/66e99b62123a1f26fa7bdf7a_BlogPod.svg"
          alt="company-logo"
          width={"180px"}
        />
      </Link>
      <nav>
        <div className="flex justify-center items-center gap-8">
          <NavItem to="/" children={"Home"} />
          <NavItem to="/all-blogs" children={"Blogs"} />
          <NavItem to="/add-blog" children={"Add"} />
          {isLoggedIn ? (
            <NavItem to="/profile" children={"Profile"} />
          ) : (
            <NavItem to="/auth/signup" children={"Signup"} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
