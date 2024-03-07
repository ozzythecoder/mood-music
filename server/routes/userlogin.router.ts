import express from "express";
import encyption from "../middleware/encryption";
import { client } from "../db/db";
import userStrategy from "../strategies/user.strategy";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("hello");
    res.send(req.user);
});

router.post("/register", async (req, res) => {
    if (!req.query.password) {
        return res.status(400).send("Invalid password.");
    }

    const password = encyption.encryptPassword(req.query.password as string);

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
