import { Request, response, Router } from "express";
import itemsModel from "../dataLayer/items";

const router = Router();

router.get('/latest', async (req: Request, res = response) => {
    try {
        const items = await itemsModel.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 5
        })
        res.json(items)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;