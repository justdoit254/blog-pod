import { Loader2 } from "lucide-react";

const Button = ({ children, isPending, disabled, className = "" }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isPending}
      className={`bg-(--dark--card-hover) text-(--white) tracking-wider rounded-lg px-8 py-4 font-semibold transition-colors duration-300 cursor-pointer hover:bg-(--dark--grey)  ${className}`}
    >
      {isPending && <Loader2 />}
      {children}
    </button>
  );
};

export default Button;
