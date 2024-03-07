import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Fatal error: MongoDB URI not found. Check environment variables.");

const client = new MongoClient(uri, {
});

(async function () {
    try {
        await client.connect();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
})();

export { client };
