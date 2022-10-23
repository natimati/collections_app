import { Request, response, Router } from "express";
import itemsModel from "../dataLayer/item";

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

router.get('/:collection_id', async (req: Request, res = response) => {
    try {
        const items = await itemsModel.findAll({
            where: { collection_id: req.params.collection_id }
        });
        res.json(items)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;