import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config();

console.log("in server");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Route includes
import songsRouter from "./routes/songs.router";
import moodsRouter from "./routes/moods.router";
import playlistRouter from "./routes/playlist.router";
import spotifyRouter from "./routes/spotify.router";
import dbPlaylistsRouter from "./routes/dbplaylists.router";

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.use("/api/songs", songsRouter);
app.use("/api/moods", moodsRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/spotify", spotifyRouter);
app.use("/api/dbplaylists", dbPlaylistsRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});