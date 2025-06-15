import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const FormInput = ({
  name,
  type = "text",
  placeholder,
  icon: Icon,
  error = "",
  onFocus,
  className,
  value,
  onChange,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-lg font-medium text-(--lime)"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2 top-8 transform -translate-y-1/2 h-6 w-6 text-(--dark--grey)" />
        )}
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className={`min-w-lg bg-(--dark--card-hover) border-1 border-[#ffffff25] text-(--white) px-8 py-3 rounded-lg transition-all duration-200 
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
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex flex-row items-center gap-1 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
