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

const VerticalPreviewCard = ({ blog }) => {
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
      className="group rounded-lg overflow-hidden shadow-md bg-(--dark--card-bg) transition duration-300 hover:bg-(--dark--card-hover) cursor-pointer flex flex-col h-full"
    >
      <div className="overflow-hidden h-64 w-full">
        <img
          src={imageUrl}
          alt="blog-image"
          className="w-full h-full object-bottom transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-5">
        <div className="flex justify-between items-center font-medium text-[1rem]">
          <span className="text-(--lime)">{tags[0]}</span>
          <span className="text-(--white-text-color)">
            {new Date(createdAt).toLocaleDateString("en-US", dateFormatOptions)}
          </span>
        </div>
        <h2 className="text-3xl font-semibold text-(--white-text-color) group-hover:text-(--lime) transition-colors duration-300">
          {title}
        </h2>
        <p className="text-(--white-text-color) text-xl">{briefIntro}</p>
        <button className="text-(--lime) font-medium mt-auto pb-2 cursor-pointer">
          Read now →
        </button>
      </div>
    </Link>
  );
};

export default VerticalPreviewCard;
