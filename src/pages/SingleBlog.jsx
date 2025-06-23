import { useLoaderData } from "react-router";

const dateFormatOptions = {
  //move to a common file
  year: "numeric",
  month: "long",
  day: "numeric",
};

const SingleBlog = () => {
  const blog = useLoaderData();

  const {
    title,
    readTime,
    tags,
    $createdAt: createdAt,
    briefIntro,
    imageUrl,
    content,
  } = blog || {};

  return (
    <main className="mx-32 my-20 text-center gap-8">
      <h1 className="uppercase font-semibold text-6xl/[4rem] p-6">{title}</h1>
      <p className="">{readTime}</p>
      <div className="my-4">
        <span className="bg-(--dark--card-bg) hover:bg-(--lime) hover:text-(--dark) px-3 py-1 rounded-sm mx-3 tracking-tight cursor-pointer font-semibold">
          {tags[0]}
        </span>
        <span className="mx-3 tracking-tighter">
          {new Date(createdAt).toLocaleDateString("en-US", dateFormatOptions)}
        </span>
      </div>
      <p>{briefIntro}</p>
      <img
        src={imageUrl}
        alt="main-blog-image"
        className="my-4 w-full object-cover h-[40rem]"
      />
      <div>
        <p className="text-left">{content}</p>
      </div>
      <div className="my-8">
        {tags?.map(
          (tag) =>
            tag && (
              <span className="bg-(--lime) text-(--dark) px-3 py-1 rounded-sm mx-3 tracking-tight cursor-pointer">
                {tag}
              </span>
            )
        )}
      </div>
    </main>
  );
};

export default SingleBlog;
