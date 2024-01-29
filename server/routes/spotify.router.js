const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// client id and secret in .env file - copied from Spotify API project Mood Music (Forrest's project currently, but can update to new project)
// console.log('my client id:', process.env.CLIENT_ID, 'my client secret:', process.env.CLIENT_SECRET);

// access token POST
router.post("/accesstoken", (req, res) => {
    // console.log('data in post', req.body)
    // console.log('my client id:', process.env.CLIENT_ID, 'my client secret:', process.env.CLIENT_SECRET);

    // adding headers to the POST request
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };

    // adding key-value pairs to the POST request body
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", process.env.CLIENT_ID);
    data.append("client_secret", process.env.CLIENT_SECRET);

    axios.post("https://accounts.spotify.com/api/token", data, {
        headers: headers,
    })
        .then(response => {
            // console.log("response.data is:", response.data);
            res.send(response.data);
        })
        .catch(error => {
            console.log("error in API token POST:", error);
            res.sendStatus(500);
        });
});

// // start of artist info GET
// router.get('/artist/:artistId', (req, res) => {
//     const artistId = req.params.artistId;
//     console.log('server side with artist ID:', artistId)

//     //  ⭐️ we would need to create a state management on the back-end if we want the access token to be server-side ⭐️

//     const headers = {
//         'Authorization': 'Bearer ' + accessToken(would go here if we had it stored),
//     };

//     axios.get(`https://api.spotify.com/v1/artists/${artistId}`)

// })

module.exports = router;
