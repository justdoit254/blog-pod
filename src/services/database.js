import { Client, Databases, Query } from "appwrite";
import config from "../config";

const transformToSlug = (input) => {
    return input
        .normalize('NFD')                            // Normalize accented characters
        .replace(/[\u0300-\u036f]/g, '')             // Remove diacritics
        .trim()                                      // Remove leading/trailing whitespace
        .toLowerCase()                               // Convert to lowercase
        .replace(/\s+/g, '-')                        // Replace all whitespace with dash
        .replace(/[^a-z0-9_-]/g, '')                 // Remove all except a-z, 0-9, _ and -
        .replace(/-+/g, '-')                         // Collapse multiple dashes into one
        .replace(/^[-]+|[-]+$/g, '')                // Remove leading/trailing dashes
        .slice(0, 36);                               // Limit slug to 36 characters
}

const calculateReadingTime = ({ title = '', briefIntro = '', content = '' }) => {
    const totalWords =
        (title.trim().split(/\s+/).length || 0) +
        (briefIntro.trim().split(/\s+/).length || 0) +
        (content.trim().split(/\s+/).length || 0);

    const wordsPerMinute = 100;       //200 is actual but for slow readers
    const time = Math.ceil(totalWords / wordsPerMinute); // rounded up

    return `${time} minute read`; // in minutes
};


export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createPost(postData) {
        //postData => {title*, briefIntro, tags*, image, content*, userId*}
        //calculate readTime
        const readTime = calculateReadingTime(postData)
        const payloadData = { ...postData, readTime, active: true }     //active is true by-default user can change this in profile in future
        //For id calculate slug
        const slug = transformToSlug(postData?.title)
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, payloadData)
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, updatedData) {
        //TODO:- Confirm if updated at is returned while fetching posts
        //updatedData => Object containing key-value pair of changed data within blog (title should not be editable as then slug might differ)
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, updatedData)
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("active", true)]) {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            throw error;
        }
    }
}

const dbService = new DatabaseService()

export default dbService