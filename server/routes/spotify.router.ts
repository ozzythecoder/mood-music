import express from "express";
const router = express.Router();
import axios from "axios";

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
    // ! node.js process should not provide client credentials, these should come from the client
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

module.exports = router;
