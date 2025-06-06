import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const FaqCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-(--white) border border-[#ffffff25] rounded-2xl mb-3 transition-all duration-300">
      <button
        className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`text-2xl font-semibold ${isOpen ? "text-(--lime)" : ""}`}
        >
          {question}
        </span>
        <div className="bg-(--dark--grey) p-2 rounded-full">
          {isOpen ? (
            <ChevronDown className="text-(--white)" />
          ) : (
            <ChevronRight className="text-(--white)" />
          )}
        </div>
      </button>
      <div
        className={`px-6 text-(--white--text-color) font-medium transition-all duration-500 ease-in-out ${
          isOpen ? "pb-6 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FaqCard;
