const express = require("express");
const router = express.Router();
const client = require("./pool");
// const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get("/", async (req, res) => {
  console.log("in mood get router");

  try {
      // Connect to the MongoDB cluster
      await client.connect();

    // Make the appropriate DB calls
    // GET full list of songs from DB
    const result = await getMoods(client);
    console.log('result:', result)
    res.send(result)
  } catch (error) {
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    // Close the connection to the MongoDB cluster
    client.close();
  }
});

async function getMoods(client) {
  const cursor = client
    .db("mood-music")
    .collection("moods")
    .find();

  const results = await cursor.toArray();

return results
}



module.exports = router;