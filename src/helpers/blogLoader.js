import { useParams } from "react-router";
import dbService from "../services/database";
import fileService from "../services/storage";

const fetchBlog = async ({ params }) => {
    try {
        // await new Promise(resolve => setTimeout(resolve, 1500)) --> Integrate loading component and then test with this delay
        const blogData = await dbService.getPost(params?.id);
        const imageUrl = fileService.getFile(blogData?.image);
        return { ...blogData, imageUrl };
    } catch (error) {
        throw new Response("Blog not found", { status: 404 })
        // throw new Response("Blog not found", { status: 404, statusText: "Blog not found" })
    }
};

export default fetchBlog