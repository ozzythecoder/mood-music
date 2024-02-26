import express from "express";
import { client } from "../db";
import { PlaylistsController } from "../services/playlists.service";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await client.connect();
        const controller = new PlaylistsController();

        // get all playlists
        const result = await controller.getPlaylists(client);
        console.log("result:", result);
        res.send(result);
    } catch (error) {
        console.log("error:", error);
        res.sendStatus(500);
    }
});

router.get("/playlist-songs", async (req, res) => {
    try {
        await client.connect();
        const controller = new PlaylistsController();

        // get all playlists
        const songTitles = req.body;
        const result = await controller.getPlaylistSongs(client, songTitles);
        console.log("result:", result);
        res.send(result);
    } catch (error) {
        console.log("error:", error);
        res.sendStatus(500);
    }
});

export default router;
