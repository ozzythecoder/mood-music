const express = require("express");
const router = express.Router();
const client = require("./pool");
// const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get("/", async (req, res) => {
  const moodName = req.query.moodName;
  console.log("moodName in get:", moodName);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // GET full list of songs from DB
    const result = await getNewPlaylist(client, moodName);
    console.log("playlist:", result);
    res.send(result);
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    // Close the connection to the MongoDB cluster
    client.close();
  }
});

async function getNewPlaylist(client, moodName) {
  const pipeline = [
    {
      $match: {
        moods: {
          $elemMatch: {
            moodName: moodName,
          },
        },
      },
    },
    { $sample: { size: 10 } },
  ];
  const cursor = client
    .db("mood-music")
    .collection("songs")
    .aggregate(pipeline);

  const results = await cursor.toArray();

  return results;
}

module.exports = router;
