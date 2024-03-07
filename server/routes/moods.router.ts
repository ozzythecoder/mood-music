import express from "express";
const router = express.Router();
import { client } from "../db/db";
import { MoodsService } from "../services/moods.service";

router.get("/", async (_req, res) => {
    console.log("in mood get router");

    try {
        const service = new MoodsService();

        const result = await service.getMoods(client);
        console.log("result:", result);
        res.send(result);
    } catch (error) {
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    }
});

export default router;
