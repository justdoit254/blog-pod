import { faqs } from "../assets/faqData";
import FaqCard from "./FaqCard";

const FaqSection = () => {
  return (
    <div className="p-14">
      <h2 className="text-5xl font-semibold text-(--white) mb-10">
        Frequently Asked Questions
      </h2>
      <div className="grid md:grid-cols-2 md:grid-rows-auto gap-6">
        <div className="flex flex-col gap-4">
          {faqs.slice(0, 4).map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {faqs.slice(4).map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
