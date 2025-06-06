import { Link } from "react-router";
import NavItem from "./NavItem";

const Footer = () => {
  const isLoggedIn = false;
  return (
    <div className="p-15 flex flex-row justify-between">
      <div className="max-w-96">
        <Link to="/">
          <img
            src="https://cdn.prod.website-files.com/66e5d487af6fa0a77ea6c4ee/66e99b62123a1f26fa7bdf7a_BlogPod.svg"
            alt="company-logo"
            width={"180px"}
          />
        </Link>
        <p className="text-xl mt-2">
          Empowering creators to share stories through blogs. Seamlessly
          designed for content-driven excellence.
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <NavItem to="/" children={"Home"} />
        <NavItem to="/all-blogs" children={"Blogs"} />
        <NavItem to="/add-blog" children={"Add"} />
      </div>
      <div className="flex flex-col gap-y-2">
        {isLoggedIn ? (
          <NavItem to="/profile" children={"Profile"} />
        ) : (
          <NavItem to="/auth/login" children={"Login"} />
        )}
        <NavItem to="/contact" children={"Contact"} />
      </div>
    </div>
  );
};

export default Footer;
