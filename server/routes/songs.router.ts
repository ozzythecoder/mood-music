import express from "express";
import { client } from "../db";
import { SongsService } from "../services/songs.service";
import type { Mood, Song } from "../definitions";

const router = express.Router();

router.get("/", async (_req, res) => {
    console.log("in song get router");

    try {
        await client.connect();
        const service = new SongsService();

        const result = await service.getSongs(client);
        res.send(result);
    } catch (error) {
        console.error("Error fetching songs (GET api/songs)\n", error);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    console.log("in song router:", req.body);

    type SongData = {
        song: Song;
        moods: Mood[];
    };

    // newSong is declared with song data either from spotify or the database.
    // conditionals are to determine where info is coming from.
    // Maybe there is a cleaner way to do this?

    // This is an indicator that we need to clean up our data structure.
    // Is spotify using "name" or "title"? We should figure out which, and then match them.
    // -August

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
        await client.connect();
        const service = new SongsService();
        await service.upsertSong(client, newSong);
    } catch (error) {
        console.error("Error fetching songs (POST api/songs)\n", error);
        res.sendStatus(500);
    }
});

export default router;
