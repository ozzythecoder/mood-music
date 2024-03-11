import { MoodsModel, Mood } from "server/interfaces";
import { MongoClient } from "mongodb";

export class MoodsService implements MoodsModel {
    async getMoods(client: MongoClient) {
        const cursor = client
            .db("mood-music")
            .collection("moods")
            .find();

        const results = await cursor.toArray();

        return results as unknown as Mood[];
    }
}
