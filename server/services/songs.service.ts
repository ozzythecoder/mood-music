import { Song } from "@src/definitions";
import { MongoClient } from "mongodb";

type InsertSong = Omit<Song, "_id" | "moodFull">;

interface SongsModel {
    getSongs: (client: MongoClient) => Promise<Song[]>;
    upsertSong: (client: MongoClient, newSong: InsertSong) => Promise<void>;
}

export class SongsController implements SongsModel {
    async getSongs(client: MongoClient) {
        const cursor = client
            .db("mood-music")
            .collection("songs")
            .aggregate([
                {
                    $lookup: {
                        from: "moods",
                        localField: "moods",
                        foreignField: "moodName",
                        as: "moodFull",
                    },
                },
            ]);

        const results = await cursor.toArray();
        return results as Song[];
    }

    async upsertSong(client: MongoClient, newSong: InsertSong) {
        await client
            .db("mood-music")
            .collection("songs")
            .updateOne(
                { title: newSong.title },
                {
                    $set: {
                        moods: newSong.moods,
                        artists: newSong.artists,
                        album: newSong.album,
                        image: newSong.image,
                    },
                },
                { upsert: true },
            );
    }
}
