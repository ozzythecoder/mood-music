import express from "express";
import { MongoClient } from "mongodb";
import { client } from "../db/db";
import { PlaylistsService } from "../services";

const router = express.Router();

router.get("/", async (req, res) => {
    const moodName = req.query.moodName;
    console.log("moodName in get:", moodName);

    try {
        // Make the appropriate DB calls
        // GET full list of songs from DB
        const result = await getNewPlaylist(client, moodName);
        console.log("playlist:", result);
        res.send(result);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    console.log("in playlist router:", req.body);

    const newPlaylist = {
        title: req.body.playlistTitle,
        description: req.body.playlistDescription,
        songs: req.body.newPlaylist.map(item => item.title),
    };

    console.log("newPlaylist:", newPlaylist);

    try {
        // Make the appropriate DB calls
        // Create or update a single song
        await upsertPlaylist(client, newPlaylist);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
});

async function getNewPlaylist(client, moodName) {
    const pipeline = [
        {
            $match: {
                moods: {
                    $elemMatch: {
                        $eq: moodName,
                    },
                },
            },
        },
        { $sample: { size: 10 } },
    ];
    const cursor = client
        .db("mood-music")
        .collection("songs")
        .aggregate(pipeline);

    const results = await cursor.toArray();

    return results;
}

// upserts playlist based on changes to moods added or subtracted.
async function upsertPlaylist(client: MongoClient, newPlaylist) {
    await client
        .db("mood-music")
        .collection("playlists")
        .updateOne(
            { title: newPlaylist.title },
            {
                $set: {
                    description: newPlaylist.description,
                    songs: newPlaylist.songs,
                },
            },
            { upsert: true },
        );
}

export default router;
