import { Song } from "server/interfaces";
import { MongoClient } from "mongodb";
import type { SongsModel, InsertSong } from "server/interfaces";

export class SongsService implements SongsModel {
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
