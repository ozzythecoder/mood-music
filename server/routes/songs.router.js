const express = require("express");
const router = express.Router();
const client = require("./pool");
// const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.post("/", async (req, res) => {
  console.log("in song router:", req.body.moods);
  // const userCurrent = req.user.clicked_song;

const newSong = {
  "moods": req.body.moods,
  "artist": req.body.song.artist,
  "title": req.body.song.title,
}

console.log('newSong:', newSong)

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Make the appropriate DB calls
    // Create a single new listing
    await addSong(client, newSong);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
});

async function addSong(client, newSong) {
  const result = await client.db("mood-music").collection("songs").insertOne(newSong);
  console.log(`New song added with the following id: ${result.insertedId}`);
}

module.exports = router;
