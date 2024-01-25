import express from "express";
import client from "./pool";
const router = express.Router();
import { getSongs, upsertSong } from "@server/actions/songs.actions";
import type { Mood, Song } from "@src/definitions";

router.get("/", async (_req, res) => {
    console.log("in song get router");

    try {
    // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // GET full list of songs from DB
        const result = await getSongs(client);
        console.log("result:", result);
        res.send(result);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
    // finally {
    //   // Close the connection to the MongoDB cluster
    //   await client.close();
    // }
});

router.put("/", async (req, res) => {
    console.log("in song router:", req.body);
    // const userCurrent = req.user.clicked_song;

    // newSong is declared with song data either from spotify or the database.
    // conditionals are to determine where info is coming from.
    // Maybe there is a cleaner way to do this?

    type SongData = {
        song: Song;
        moods: Mood[];
    };

    const { song, moods } = req.body as SongData;

    const newSong = {
        moods: moods.map(mood => mood.moodName),
        artists: Array.isArray(song.artists)
            ? song.artists.map(artist => artist.name).join(", ")
            : song.artists,
        title: song.name ? song.name : song.title,
        album: song.album.name,
        image: song.album.images
            ? song.album.images[0].url
            : song.image,
    };

    console.log("newSong:", newSong);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        // Create or update a single song
        await upsertSong(client, newSong);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
});

export default router;
