import React, { useContext, useState } from "react";
import { AlertCircle } from "lucide-react";
import FormInput from "../components/FormInput";
import TextAreaInput from "../components/TextAreaInput";
import useFormValidation from "../customHooks/useFormValidation";
import placeholderImage from "../assets/image-placeholder.svg";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import fileService from "../services/storage";
import { useToast } from "../context/ToastContext";
import dbService from "../services/database";

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

const validationRules = {
  title: {
    required: true,
    requiredMessage: "Title is required",
    minLength: 3,
    minLengthMessage: "Please enter a meaningful title",
  },
  tags: {
    //Array so using minLength instead of required
    isArray: true,
    minLength: 1,
    minLengthMessage: "Please enter atleast 1 tag",
  },
  content: {
    //Max length is handled by input
    required: true,
    minLength: 10,
    minLengthMessage: "Please enter a meaningful content",
  },
};

const AddBlog = () => {
  const { userData } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [briefIntro, setBriefIntro] = useState("");
  const [tags, setTags] = useState(["", "", ""]);
  const [selectedImage, setSelectedImage] = useState(placeholderImage);
  const [imageName, setImageName] = useState("");
  const [content, setContent] = useState("");
  const [blogFormErrors, setBlogFormErrors] = useState(null);

  const { errors, validateForm, clearError } =
    useFormValidation(validationRules);

  console.log("errors", errors, "blogErrors", blogFormErrors);

  const { showToast } = useToast();

  const validFileType = (file) => {
    return fileTypes.includes(file.type);
  };

  const handleClearError = (field) => {
    setBlogFormErrors((prevState) => ({ ...prevState, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    // formData.append("briefIntro", briefIntro);
    formData.append("tags", tags);
    formData.append("content", content);
    // formData.append("userID", userData?.$id);

    if (!validateForm(formData)) {
      showToast("Complete required fields", "error");
      return;
    }

    //First upload the file if user selected the image
    let image = null;
    if (imageName) {
      const imageFile = await fileService.uploadFile(selectedImage);
      if (!imageFile?.$id) {
        showToast("Error uploading image", "error");
        return;
      }
      image = imageFile?.$id;
    }

    //Upload blog
    const blogUpload = await dbService.createPost({
      title,
      briefIntro,
      tags,
      image,
      content,
      userId: userData?.$id,
    });

    //Show toast
    showToast("Blog published");

    //Navigate to blog page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-5xl mx-auto space-y-4 bg-(--dark--card-bg)"
    >
      <div className="w-full gap-4 flex flex-col">
        <FormInput
          name={"title"}
          type="text"
          placeholder={"Blog title"}
          label={"Title (required)"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => clearError("title")}
          error={errors?.title}
          className={"w-full py-3"}
        />
        <FormInput
          name={"introduction"}
          type="text"
          placeholder={"Brief introduction (upto 15 words)"}
          error={blogFormErrors?.briefIntro}
          onFocus={() => clearError("briefIntro")}
          label={"Brief introduction (optional)"}
          value={briefIntro}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 15) {
              setBriefIntro(e.target.value);
            } else {
              setBlogFormErrors((prev) => ({
                ...prev,
                briefIntro: "Content can not be more than 500 words.",
              }));
            }
          }}
          className={"w-full py-3"}
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-10 mb-0">
        <div>
          <p className="block mb-1 text-lg font-medium text-(--lime)">
            Tags (at least 1 required)
          </p>
          <div className="flex flex-col gap-2 w-full">
            {tags.map((tag, index) => (
              <FormInput
                key={index}
                name={`tag${index + 1}`}
                type="text"
                placeholder={`Tag ${index + 1}`}
                error={errors?.tags}
                onFocus={() => clearError("tags")}
                className={"flex-1"}
                value={tag}
                onChange={(e) => {
                  const newTags = [...tags];
                  newTags[index] = e.target.value;
                  setTags(newTags);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-2 mt-8">
          <div className="w-64 h-40 rounded-lg overflow-hidden flex items-center justify-center">
            {selectedImage ? (
              <img
                src={
                  imageName ? URL.createObjectURL(selectedImage) : selectedImage
                }
                alt="preview"
                className="object-cover w-full h-full"
                // style={"rounded-lg"}
              />
            ) : (
              <span className="text-(--white)">Image Preview</span>
            )}
          </div>
          <div className="text-center">
            <label
              className="cursor-pointer mb-1 text-lg font-medium text-(--lime) text-center"
              htmlFor="image"
            >
              {`${
                selectedImage?.type ? selectedImage.name : "Select an image"
              }`}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (validFileType(file)) {
                    setSelectedImage(file);
                    setImageName(file.name);
                  } else {
                    setBlogFormErrors((prev) => ({
                      ...prev,
                      file: "Please select valid image file",
                    }));
                  }
                }
              }}
              onFocus={() => handleClearError("file")}
              className="opacity-0"
            />
            {blogFormErrors?.file && (
              <ErrorMessage error={blogFormErrors?.file} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <TextAreaInput
          name={"content"}
          label={"Content (required)"}
          placeholder={"Blog content"}
          error=""
          onFocus={() => handleClearError("content")}
          value={content}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/);
            if (words.length <= 500) {
              setContent(e.target.value);
            } else {
              setBlogFormErrors((prev) => ({
                ...prev,
                content: "Content can not be more than 500 words.",
              }));
            }
          }}
          className={"min-h-96"}
        />
        {blogFormErrors?.content && (
          <ErrorMessage error={blogFormErrors?.content} />
        )}
      </div>
      <div className="w-full flex justify-center mt-5">
        <Button
          children={"Publish Blog"}
          className="hover:shadow-lg hover:bg-(--lime) hover:text-(--dark--grey)"
        />
      </div>
    </form>
  );
};

export default AddBlog;

const ErrorMessage = ({ error }) => (
  <div className="flex flex-row items-center gap-1 text-sm text-red-500">
    <AlertCircle className="h-4 w-4" />
    {error}
  </div>
);
