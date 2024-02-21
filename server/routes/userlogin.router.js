const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const client = require("./pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("hello");
    res.send(req.user);
});

router.post("/register", async (req, res, next) => {
    const password = encryptLib.encryptPassword(req.query.password);
    const doc = {
        username: req.query.username,
        password: password,
    };
    try {
        await client.connect();
        const result = await client.db("mood-music").collection("users").insertOne(doc);

        console.log(result);
        res.sendStatus(201);
    } catch (error) {
        console.log("ERROR: ", error);
        res.sendStatus(500);
    }

    // const queryText = `INSERT INTO "users" (username, password)
    //     VALUES ($1, $2) RETURNING id`;
    // pool
    //     .query(queryText, [username, password])
    //     .then(() => res.sendStatus(201))
    //     .catch((err) => {
    //     console.log('User registration failed: ', err);
    //     res.sendStatus(500);
    //     });
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
    // console.log("LOGGING USER IN........", req);

    res.sendStatus(200);
});

router.post("/logout", (req, res) => {
    req.logout();
    res.sendStatus(200);
});

async function registerUser(client, doc) {

}

module.exports = router;
