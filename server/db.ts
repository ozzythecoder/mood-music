import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Fatal error: MongoDB URI not found. Check environment variables.");

export const client = new MongoClient(uri);