const express = require("express");
const router = express.Router();
const client = require('./pool')
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.post("/", async (req, res) => {
    const userCurrent = req.user.clicked_song;
  
    try {
          // Connect to the MongoDB cluster
          await client.connect();
          // Make the appropriate DB calls
          // Create a single new listing
          await addSong(client,
              {
// title: {req.}
              }
          );
            } finally {
      // Close the connection to the MongoDB cluster
      await client.close();
  }
}
  )

  async function addSong(client, newSong) {
    const result = await client
      .db("")
      .collection("")
      .insertOne(newSong);
    console.log(
      `New song added with the following id: ${result.insertedId}`
    );
  }