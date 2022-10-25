import { Request, response, Router } from "express";
import itemsModel from "../dataLayer/item";
import itemPropertyModel from '../dataLayer/itemProperty';
import authMiddlewere from "../middlewares/auth";

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

router.post('/create', [authMiddlewere], async (req: Request, res = response) => {
    const { collection_id, author_id, name, image_url, item_properties } = req.body;

    try {
        const item = await itemsModel.create({
            collection_id: collection_id,
            author_id: author_id,
            name: name,
            image_url: image_url,
        })

        await itemPropertyModel.bulkCreate(item_properties.map((property:
            {
                additional_field_id: string,
                collection_id: string,
                value: string
            }) => {
            return ({
                additional_field_id: property.additional_field_id,
                collection_id: item.collection_id,
                item_id: item.id,
                value: property.value
            })
        }))

        res.status(201).json({ message: 'collection created' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
});

export default router;