import { Account, Client, ID } from "appwrite";
import config from "../config"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const createdUser = await this.account.create(ID.unique(), email, password, name);
            if (createdUser) {
                //Login user as well
                return this.login({ email, password });
            } else {
                return createdUser
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

const authService = new AuthService()

export default authService