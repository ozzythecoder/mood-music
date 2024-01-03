const express = require("express");
const client = require("./pool");
const router = express.Router();



router.get("/", async (req, res) => {

  try {

    await client.connect();

    // get all playlists
    const result = await getPlaylists(client);
    console.log("result:", result);
    res.send(result);
  } catch (error) {
    console.log(`error:`, error);
    res.sendStatus(500);
  }

});


// async function getPlaylists(client) {

//   // pipeline aggregates a property to the recieved playlists data
//   const pipeline = [
//     {
//       $lookup:
//       {
//         from: "playlists",
//         localField: "playlists.songs",
//         foreignField: "title",
//         as: "playlistsContents",
//       }
//     }
//   ];

//   const cursor = client.db("mood-music").collection("playlists").aggregate(pipeline);

//   const results = await cursor.toArray();

//   return results;
// }


async function getPlaylists(client) {

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db('mood-music');
    const playlistsCollection = database.collection('playlists');
    const songsCollection = database.collection('songs');

    // Fetch all playlists
    const playlists = await playlistsCollection.find().toArray();

    // Iterate over each playlist and fetch corresponding songs
    const playlistsWithSongs = await Promise.all(
      playlists.map(async (playlist) => {
        // Fetch songs for the current playlist
        const songs = await songsCollection
          .find({ title: { $in: playlist.songs } })
          .toArray();

        // Append songs data to the playlist
        return {
          ...playlist,
          songs,
        };
      })
    );

    return playlistsWithSongs;
  } finally {
    await client.close();
    console.log('Connection to the database closed');
  }
}


module.exports = router;
