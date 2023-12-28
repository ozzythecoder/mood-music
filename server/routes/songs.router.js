const express = require("express");
const router = express.Router();
const client = require("./pool");
// const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get("/", async (req, res) => {
  console.log("in song get router");

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // GET full list of songs from DB
    const result = await getSongs(client);
    console.log("result:", result);
    res.send(result);
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } 
  // finally {
  //   // Close the connection to the MongoDB cluster
  //   await client.close();
  // }
});

router.put("/", async (req, res) => {
  console.log("in song router:", req.body.moods);
  // const userCurrent = req.user.clicked_song;

  const newSong = {
    moods: req.body.moods,
    artist: req.body.song.artist,
    title: req.body.song.title,
  };

  console.log("newSong:", newSong);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Make the appropriate DB calls
    // Create or update a single song
    await upsertSong(client, newSong);
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  }
});

async function getSongs(client) {
  const pipeline = [
    {
      $lookup: 
      {
        from: "moods",
        localField: "moods.moodName",
        foreignField: "moodName",
        as: "moodFull",
      }
    }
  ];

  const cursor = client.db("mood-music").collection("songs").aggregate(pipeline);

  const results = await cursor.toArray();

  return results;
}

// upserts one song based on changes to moods added or subtracted.
async function upsertSong(client, newSong) {
  await client
    .db("mood-music")
    .collection("songs")
    .updateOne(
      { title: newSong.title },
      {
        $set: {
          moods: newSong.moods,
        },
      },
      { upsert: true }
    );
}

module.exports = router;
