import { Request, response, Router } from "express";
import additionalFieldModel from "../dataLayer/additionalField";
import collectionsModel from "../dataLayer/collection";
import authMiddlewere from "../middlewares/auth";
import { Op } from 'sequelize';

const router = Router();

router.get('/:id', async (req: Request, res = response) => {
    try {
        const collection = await collectionsModel.findOne({
            where: { id: req.params.id },
            include: {
                model: additionalFieldModel,
                as: 'additional_fields'
            }
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

        await additionalFieldModel.bulkCreate(additional_fields.map((field: { name: string, type: string }) => {
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

router.post('/update', [authMiddlewere], async (req: Request, res = response) => {
    const { id, name, topic, description, image_url, additional_fields } = req.body;

    try {
        await collectionsModel.update({
            name: name,
            topic: topic,
            description: description,
            image_url: image_url,
        }, { where: { id: id } })

        await additionalFieldModel.bulkCreate(additional_fields.map((field: { id: string, name: string, type: string }) => {
            return ({
                collection_id: id,
                id: field.name,
                name: field.name,
                type: field.type,
            })
        }), { updateOnDuplicate: ['name', 'type'] });

        const fieldsIds = additional_fields.map((field: { id: string, name: string, type: string }) => field.id);

        await additionalFieldModel.destroy({
            where: { collection_id: id, id: { [Op.notIn]: fieldsIds } }
        });

        res.status(201).json({ message: 'collection updated' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
});


router.get('/find/:author_id', async (req: Request, res = response) => {
    try {
        const collection = await collectionsModel.findAll({
            where: { author_id: req.params.author_id }
        });
        res.json(collection)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/delete', [authMiddlewere], async (req: Request, res = response) => {
    try {
        await collectionsModel.destroy({
            where: { id: req.params.collectionId }
        });
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});



export default router;