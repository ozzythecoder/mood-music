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
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
    // finally {
    //   // Close the connection to the MongoDB cluster
    //   await client.close();
    // }
});

router.put("/", async (req, res) => {
    console.log("in song router:", req.body);
    // const userCurrent = req.user.clicked_song;

    // newSong is declared with song data either from spotify or the database.
    // conditionals are to determine where info is coming from. Maybe there is a cleaner way to do this?
    const newSong = {
        moods: req.body.moods.map((mood) => mood.moodName),
        artists: Array.isArray(req.body.song.artists)
            ? req.body.song.artists.map((artist) => artist.name).join(", ")
            : req.body.song.artists,
        title: req.body.song.name ? req.body.song.name : req.body.song.title,
        album: req.body.song.album.name,
        image: req.body.song.album.images
            ? req.body.song.album.images[0].url
            : req.body.song.image,
    };

    console.log("newSong:", newSong);

    try {
    // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        // Create or update a single song
        await upsertSong(client, newSong);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
});

async function getSongs(client) {
    // creates a pipeline that aggregates a 'moodFull' property to the returned songs.
    // moodFull is an array of mood objects with _id, moodName, and color
    // Maybe there is a way to append the id and color info onto the already existing mood objects?
    const pipeline = [
        {
            $lookup: {
                from: "moods",
                localField: "moods",
                foreignField: "moodName",
                as: "moodFull",
            },
        },
    ];

    const cursor = client
        .db("mood-music")
        .collection("songs")
        .aggregate(pipeline);

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
                    artists: newSong.artists,
                    album: newSong.album,
                    image: newSong.image,
                },
            },
            { upsert: true },
        );
}

module.exports = router;
