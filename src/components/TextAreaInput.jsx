import { AlertCircle } from "lucide-react";

const TextAreaInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  rows = 8,
  error = "",
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-lg font-medium text-(--lime)"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        className="w-full min-h-96 p-3 border-1 border-[#ffffff25] text-(--white) focus:outline-none focus:ring-2 focus:ring-(--lime) rounded-lg"
      />
      <div className="text-right text-sm text-(--white)">
        {value.trim().split(/\s+/).filter(Boolean).length} / 500 words
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

export default TextAreaInput;
