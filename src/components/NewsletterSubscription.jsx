import { useContext, useRef, useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { Mail } from "lucide-react";
import useFormValidation from "../customHooks/useFormValidation";
import dbService from "../services/database";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    requiredMessage: "Email is required",
    patternMessage: "Please enter a valid email address",
  },
};

const NewsletterSubscription = () => {
  const { userData: user } = useContext(AuthContext);

  const emailRef = useRef(null);

  const { showToast } = useToast();

  const { errors, validateForm, clearError } =
    useFormValidation(validationRules);

  const handleSubmit = async (formData) => {
    if (!validateForm(formData)) return;

    await dbService.newsletterSubscribe({
      email: formData.get("email"),
      userId: user?.$id,
    });

    showToast(`Thanks! you've subscribed to our newsletter.`);
  };

  const handleFormSubmit = () => {
    const inputs = document.querySelectorAll("#newsletter-form input");
    const formData = new FormData();
    inputs.forEach((input) => {
      formData.append(input.name, input.value);
    });
    handleSubmit(formData);
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
          error={errors.email}
          onFocus={() => clearFocus("email")}
          className={"py-4"}
        />
        <div onClick={handleFormSubmit}>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
