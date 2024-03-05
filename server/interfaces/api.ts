import { MongoClient } from "mongodb";
import { Song, Playlist, Mood } from "server/definitions";

export interface PlaylistsModel {
    getPlaylists: (client: MongoClient) => Promise<Playlist[]>;
    getPlaylistSongs: (client: MongoClient, songTitles: string[]) => Promise<Song[]>;
}

export type InsertSong = Omit<Song, "_id" | "moodFull">;

export interface SongsModel {
    getSongs: (client: MongoClient) => Promise<Song[]>;
    upsertSong: (client: MongoClient, newSong: InsertSong) => Promise<void>;
}

export interface MoodsModel {
    getMoods: (client: MongoClient) => Promise<Mood[]>;
}
