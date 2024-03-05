import { MongoClient } from "mongodb";
import { PlaylistsModel, Playlist, Song } from "server/interfaces";

export class PlaylistsService implements PlaylistsModel {
    async getPlaylists(client: MongoClient) {
    // pipeline aggregates a property to the recieved playlists data
        const pipeline = [
            {
                $lookup:
                {
                    from: "playlists",
                    localField: "playlists.songs",
                    foreignField: "title",
                    as: "playlistsContents",
                },
            },
        ];

        const cursor = client.db("mood-music").collection("playlists").aggregate(pipeline);
        const results = await cursor.toArray();
        return results as unknown as Playlist[];
    }

    async getPlaylistSongs(client: MongoClient, songTitles: string[]) {
        const result = await client
            .db("mood-music")
            .collection("songs")
            .find({
                title: {
                    $in: songTitles,
                },
            })
            .toArray();
        return result as unknown as Song[];
    }
}
