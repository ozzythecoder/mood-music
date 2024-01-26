import { MongoClient, type Document } from "mongodb";

interface SongsModel {
    getSongs: (client: MongoClient) => Promise<Document[]>;
    upsertSong: (client: MongoClient, newSong: any) => Promise<void>;
}

export class SongsController implements SongsModel {
    async getSongs(client: MongoClient) {
        const pipeline = [
            {
                $lookup: {
                    from: "moods",
                    localField: "moods",
                    foreignField: "moodName",
                    as: "moodFull",
                },
            },
        ];

        const cursor = client
            .db("mood-music")
            .collection("songs")
            .aggregate(pipeline);

        const results = await cursor.toArray();

        return results;
    }

    async upsertSong(client: MongoClient, newSong: any) {
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

export async function getSongs(client: MongoClient) {
    // creates a pipeline that aggregates a 'moodFull' property to the returned songs.
    // moodFull is an array of mood objects with _id, moodName, and color
    // Maybe there is a way to append the id and color info onto the already existing mood objects?
    const pipeline = [
        {
            $lookup: {
                from: "moods",
                localField: "moods",
                foreignField: "moodName",
                as: "moodFull",
            },
        },
    ];

    const cursor = client
        .db("mood-music")
        .collection("songs")
        .aggregate(pipeline);

    const results = await cursor.toArray();

    return results;
}

// upserts one song based on changes to moods added or subtracted.
export async function upsertSong(client: MongoClient, newSong: any) {
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
