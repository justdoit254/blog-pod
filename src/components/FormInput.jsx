import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const FormInput = ({
  name,
  type = "text",
  placeholder,
  icon: Icon,
  error = "",
  //   onFocus,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  return (
    <div className="space-y-1">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2 top-8 transform -translate-y-1/2 h-6 w-6 text-(--dark--grey)" />
        )}
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          //   onFocus={onFocus}
          className={`min-w-lg  bg-(--dark--card-hover) border-1 border-[#ffffff25] text-(--white) px-8 py-4 rounded-lg transition-all duration-200 
            ${Icon ? "pl-10" : ""} 
            ${isPassword ? "pr-10" : ""} 
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-1 focus:ring-(--lime)"
            } 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder:text-(--dark--grey) 
            ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && (
        <div>
          <AlertCircle />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
