import { Request, response, Router } from "express";
import additionalFieldModel from "../dataLayer/additionalField";
import collectionsModel from "../dataLayer/collection";
import userModel from "../dataLayer/user"
import authMiddlewere from "../middlewares/auth";
import { Op, Sequelize } from 'sequelize';
import isCollectionAuthorAtLeast from "../middlewares/isCollectionAuthorAtLeast";
import sanitize from "sanitize-html";

const router = Router();

router.get('/largest', async (req: Request, res = response) => {
    try {
        const collections = await collectionsModel.findAll({
            order: [
                [Sequelize.literal('itemsCount'), 'DESC']
            ],
            limit: 5,
            include: [
                {
                    model: userModel,
                    attributes: ['id', 'username'],
                    as: 'author',
                }
            ],
            attributes: [
                'id',
                'name',
                'topic',
                'image_url',
                [Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM items
                    WHERE
                        items.collection_id = collection.id)`),
                    'itemsCount'             
                ]
            ]
        })
        res.json(collections)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/:collectionId', async (req: Request, res = response) => {
    try {
        const collection = await collectionsModel.findOne({
            where: { id: req.params.collectionId },
            include: [{
                model: additionalFieldModel,
                as: 'additional_fields'
            },
            {
                model: userModel,
                attributes: ['id', 'username'],
                as: 'author',
            }
            ]

        });
        res.json(collection)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.post('/create', [authMiddlewere], async (req: Request, res = response) => {
    const { author_id, name, topic, description, image_url, additional_fields } = req.body;
    const sanitizedDescription = sanitize(description);

    try {
        const collection = await collectionsModel.create({
            author_id: author_id,
            name: name,
            topic: topic,
            description: sanitizedDescription,
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

router.post('/update/:collectionId', [isCollectionAuthorAtLeast], async (req: Request, res = response) => {
    const { id, name, topic, description, image_url, additional_fields } = req.body;
    const sanitizedDescription = sanitize(description);


    try {
        await collectionsModel.update({
            name: name,
            topic: topic,
            description: sanitizedDescription,
            image_url: image_url,
            updated_at: new Date(),
        }, { where: { id: id } })

        await additionalFieldModel.bulkCreate(additional_fields.map((field: { id: string, name: string, type: string }) => {
            return ({
                collection_id: id,
                id: field.id,
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
        const collections = await collectionsModel.findAll({
            where: { author_id: req.params.author_id }
        });
        res.json(collections)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.delete('/delete', [isCollectionAuthorAtLeast], async (req: Request, res = response) => {
    try {
        await collectionsModel.destroy({
            where: { id: req.body.collectionId }
        });
        res.status(200).send({ message: 'Success' });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Faild to delete user' });
    }
});

export default router;