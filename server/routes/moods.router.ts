import express from "express";
const router = express.Router();
import { client } from "../db";
import { MoodsController } from "../services/moods.service";

router.get("/", async (_req, res) => {
    console.log("in mood get router");

    try {
        await client.connect();
        const controller = new MoodsController()

        const result = await controller.getMoods(client);
        console.log("result:", result);
        res.send(result);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    } finally {
        client.close();
    }
});

export default router;
