import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import TextAreaInput from "../components/TextAreaInput";
import Button from "../components/Button";
import dbService from "../services/database";

const Contact = () => {
  const { userData: user, isLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submit", e);
    await dbService.createQuery({ ...formData, userId: user?.$id });
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 flex flex-col justify-center">
      <h1 className="text-7xl font-bold text-center mb-12">Ask Your Query!</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-7 gap-6">
          <FormInput
            name={"name"}
            type="text"
            required
            placeholder={"Your name"}
            value={formData.name}
            onChange={handleChange}
            // onFocus={() => clearError("name")}
            // error={errors?.name}
            className={"min-w-md py-5"}
          />
          <FormInput
            name={"email"}
            type="email"
            required
            placeholder={"Your email"}
            value={formData.email}
            onChange={handleChange}
            // onFocus={() => clearError("email")}
            // error={errors?.email}
            className={"min-w-md py-5"}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-7 gap-6">
          <FormInput
            name={"phone"}
            type="text"
            placeholder={"Your phone number (optional)"}
            value={formData.phone}
            onChange={handleChange}
            // onFocus={() => clearError("phone")}
            // error={errors?.phone}
            className={"min-w-md py-5"}
          />
          <FormInput
            name={"subject"}
            type="text"
            required
            placeholder={"Subject"}
            value={formData.subject}
            onChange={handleChange}
            // onFocus={() => clearError("subject")}
            // error={errors?.subject}
            className={"min-w-md py-5"}
          />
        </div>
        <TextAreaInput
          name={"message"}
          placeholder={"Your message"}
          rows={6}
          // onFocus={() => handleClearError("message")}
          value={formData.message}
          onChange={handleChange}
          className={"min-h-40 mx-7"}
        />
        <Button
          children={"Submit"}
          className="hover:shadow-lg hover:bg-(--lime) hover:text-(--dark--grey)"
        />
      </form>
    </div>
  );
};

export default Contact;
