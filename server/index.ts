import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Dotenv package is not required with "node --env-file" flag
// require("dotenv").config();

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

// Listen
app.listen(3000, () => {
    console.log("Express server listening on port 3000\n");
});

// Interface extension - allows us to add custom properties to Request object
declare module "express-serve-static-core" {
    export interface Request {
        user?: {
            _id: string;
            username: string;
        };
        isAuthenticated: () => Boolean; // passport.js method
    }
}
