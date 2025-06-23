import { useRouteError } from "react-router";

const BlogNotFound = () => {
  const error = useRouteError();

  return (
    <div className="text-center p-10 text-red-500">
      <h2 className="text-3xl font-bold mb-4">Oops! Blog not found.</h2>
      <p>{error.statusText || "Something went wrong."}</p>
    </div>
  );
};

export default BlogNotFound;
