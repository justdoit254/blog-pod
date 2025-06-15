import { useRef, useState, useTransition } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { Mail } from "lucide-react";
import useFormValidation from "../customHooks/useFormValidation";

const NewsletterSubscription = () => {
  // const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      requiredMessage: "Email is required",
      patternMessage: "Please enter a valid email address",
    },
  };

  const { errors, validateForm, clearError } =
    useFormValidation(validationRules);

  const handleSubmit = async (formData) => {
    if (!validateForm(formData)) return;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = formData.get("email");
    console.log("Newsletter signup:", { email });
    setSuccess(`Thanks! We've subscribed ${email} to our newsletter.`);
  };

  const handleFormSubmit = () => {
    const inputs = document.querySelectorAll("#newsletter-form input");
    const formData = new FormData();
    inputs.forEach((input) => {
      formData.append(input.name, input.value);
    });
    handleSubmit(formData);
    // startTransition(() => handleSubmit(formData));
  };
  return (
    <div className="max-w-6xl mx-auto p-32 bg-(--dark--card-bg) rounded-3xl shadow-lg flex flex-col items-center">
      <div className="text-center mb-8 w-10/12">
        <h2 className="text-5xl font-semibold text-(--white)">
          Subscribe to our email newsletter
        </h2>
      </div>
      <div id="newsletter-form" className="flex gap-x-16">
        <FormInput
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          ref={emailRef}
          //   error={errors.email}
          //   onFocus={() => clearFocus("email")}
          className={"py-4"}
        />
        <div onClick={handleFormSubmit}>
          {/* <Button isPending={isPending}>Submit</Button> */}
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
