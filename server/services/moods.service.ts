import { MongoClient } from "mongodb";
import { Mood } from "../definitions";

interface MoodsModel {
    getMoods: (client: MongoClient) => Promise<Mood[]>;
}

export class MoodsController implements MoodsModel {
    async getMoods(client: MongoClient) {
        const cursor = client
            .db("mood-music")
            .collection("moods")
            .find();

        const results = await cursor.toArray();

        return results as unknown as Mood[];
    }
}
