import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { cookieSession } from "./middleware";
import {
    dbPlaylistRoute,
    moodsRoute,
    songsRoute,
    playlistsRoute,
    spotifyRoute,
} from "./routes";

// Dotenv package is not required with "node --env-file" flag
// require("dotenv").config();

// App configuration
const app = express();
const appConfig = [
    cors(),
    cookieSession,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
];
app.use(appConfig);

// Routes
app.use("/api/songs", songsRoute);
app.use("/api/moods", moodsRoute);
app.use("/api/playlist", playlistsRoute);
app.use("/api/spotify", spotifyRoute);
app.use("/api/dbplaylists", dbPlaylistRoute);

// Initialize server
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
