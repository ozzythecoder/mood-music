const express = require("express");
const router = express.Router();
const client = require("./pool");
// const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get("/", async (req, res) => {
  console.log("in song get router");

      // Connect to the MongoDB cluster
      const connection = await client.connect();

  try {
    await connection.query('BEGIN');
    // Make the appropriate DB calls
    // GET full list of songs from DB
    const result = await getSongs(client);
    await connection.query('COMMIT');
    res.send(result.rows)
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
});

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
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
});

async function getSongs(client) {
  const cursor = client
    .db("mood-music")
    .collection("songs")
    .find();

  const results = await cursor.toArray();

    console.log(`Found songs:`);
    results.forEach((result, i) => {
        console.log(result.title);
    });
}

async function addSong(client, newSong) {
  const result = await client.db("mood-music").collection("songs").insertOne(newSong);
  console.log(`New song added with the following id: ${result.insertedId}`);
}


module.exports = router;
