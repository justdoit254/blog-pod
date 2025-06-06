import { NavLink } from "react-router";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-semibold transition-colors duration-200 ${
          isActive
            ? "text-(--lime)"
            : "text-(--white-text-color) hover:text-(--lime)"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
