import { Request, response, Router } from "express";
import additionalFieldModel from "../dataLayer/additionalField";
import collectionsModel from "../dataLayer/collection";
import authMiddlewere from "../middlewares/auth";

const router = Router();

router.get('/:id', async (req: Request, res = response) => {
    try {
        const collection = await collectionsModel.findOne({
            where: { id: req.params.id }
        });
        res.json(collection)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.post('/create', [authMiddlewere], async (req: Request, res = response) => {
    const { author_id, name, topic, description, image_url, additional_fields } = req.body;

    try {
        const collection = await collectionsModel.create({
            author_id: author_id,
            name: name,
            topic: topic,
            description: description,
            image_url: image_url,
        })

        await additionalFieldModel.bulkCreate(additional_fields.map((field: {name: string, type: string}) => {
            return ({
                collection_id: collection.id,
                name: field.name,
                type: field.type,
            })
        }))

        res.status(201).json({ message: 'collection created' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
});

router.get('/:author_id', async (req: Request, res = response) => {
    try {
        const collection = await collectionsModel.findOne({
            where: { author_id: req.params.author_id }
        });
        res.json(collection)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;