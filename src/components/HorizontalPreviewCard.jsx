import { useEffect, useState } from "react";
import { Link } from "react-router";
import placeholderImage from "../assets/image-placeholder.svg";
import { useToast } from "../context/ToastContext";
import fileService from "../services/storage";

const dateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const HorizontalPreviewCard = ({ blog }) => {
  const [imageUrl, setImageUrl] = useState(placeholderImage);
  const { showToast } = useToast();
  const {
    $id: id,
    title,
    briefIntro,
    image: imageId,
    tags = [],
    $createdAt: createdAt,
  } = blog || {};

  useEffect(() => {
    try {
      const imageUrl = fileService.getFile(imageId);
      setImageUrl(imageUrl);
    } catch (error) {
      imageId && showToast("Error fetching image", "error");
    }
  }, [imageId]);

  return (
    <Link
      to={`/blog/${id}`}
      className="group rounded-lg p-10 overflow-hidden shadow-md bg-(--dark--card-bg) transition duration-300 hover:bg-(--dark--card-hover) cursor-pointer flex flex-col md:flex-row h-full"
    >
      <div className="w-full md:w-1/2 p-3">
        <div className="overflow-hidden h-48 md:h-80 rounded-lg">
          <img
            src={imageUrl}
            alt="blog-image"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-5 flex flex-col justify-between gap-5">
        <div className="flex justify-between items-center font-medium text-[1rem]">
          <span className="bg-(--lime) text-(--dark) px-4 py-2 rounded-lg">
            {tags[0]}
          </span>
          <span className="text-(--white-text-color)">
            {new Date(createdAt).toLocaleDateString("en-US", dateFormatOptions)}
          </span>
        </div>
        <h2 className="text-3xl font-semibold text-(--white-text-color) group-hover:text-(--lime) transition-colors duration-300">
          {title}
        </h2>
        <p className="text-(--white-text-color) text-xl">{briefIntro}</p>
        <button className="text-(--lime) font-medium mt-auto pb-2 cursor-pointer text-2xl">
          Read now →
        </button>
      </div>
    </Link>
  );
};

export default HorizontalPreviewCard;
