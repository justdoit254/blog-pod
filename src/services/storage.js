import { Client, ID, Storage } from "appwrite";
import config from "../config";

export class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client = this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile("684d5bc8000d75857b54", ID.unique(), file)
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            throw error;
        }
    }

    getFile(fileId) {
        try {
            return this.storage.getFileView(config.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite serive :: getFile :: error", error);
            throw error;
        }
    }
}

const fileService = new StorageService()

export default fileService