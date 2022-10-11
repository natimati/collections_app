import { Request, response, Router } from "express";
import itemModel from "../dataLayer/items";

const router = Router();

router.get('/'), async (req: Request, res = response) => {
    try {
        const query = req.query.searchPhrase as string;
        const result = await itemModel.findAll({ where: { name: query } })
        res.json(result)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
};

export default router;