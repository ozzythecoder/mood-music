import express from "express";
import { client } from "../db";
import { SongsController } from "server/services/songs.service";
import type { Mood, Song } from "@src/definitions";

const router = express.Router();

router.get("/", async (_req, res) => {
    console.log("in song get router");

    try {
        await client.connect();
        const controller = new SongsController();

        const result = await controller.getSongs(client);
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
        const controller = new SongsController();
        await controller.upsertSong(client, newSong);
    } catch (error) {
        console.error("Error fetching songs (POST api/songs)\n", error);
        res.sendStatus(500);
    }
});

export default router;
