import { Loader2 } from "lucide-react";

const Button = ({ children, isPending, disabled, className = "", onClick }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isPending}
      className={`bg-(--dark--card-hover) tracking-wider rounded-lg px-8 py-4 font-semibold transition-colors duration-300 cursor-pointer hover:bg-(--dark--grey)  ${className}`}
      onClick={onClick}
    >
      {isPending && <Loader2 />}
      {children}
    </button>
  );
};

export default Button;
