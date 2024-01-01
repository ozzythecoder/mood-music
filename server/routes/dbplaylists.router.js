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


async function getPlaylists(client) {

  // pipeline aggregates a property to the recieved playlists data
  const pipeline = [
    {
      $lookup:
      {
        from: "playlists",
        localField: "playlists.songs",
        foreignField: "title",
        as: "playlistsContents",
      }
    }
  ];

  const cursor = client.db("mood-music").collection("playlists").aggregate(pipeline);

  const results = await cursor.toArray();

  return results;
}


module.exports = router;
