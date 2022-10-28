import { Request, response, Router } from "express";
import AdditionalFieldModel from "../dataLayer/additionalField";
import CollectionModel from "../dataLayer/collection";
import ItemsModel from "../dataLayer/item";
import ItemPropertyModel from '../dataLayer/itemProperty';
import UserModel from "../dataLayer/user";
import authMiddlewere from "../middlewares/auth";
import algoliasearch from "algoliasearch";

const router = Router();

router.get('/latest', async (req: Request, res = response) => {
    try {
        const items = await ItemsModel.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            limit: 5,
            include: [{
                model: CollectionModel,
                attributes: ['id', 'name'],
                as: 'collection'
            },
            {
                model: UserModel,
                attributes: ['id', 'username'],
                as: 'author'
            }]
        })
        res.json(items)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/collection/:collection_id', async (req: Request, res = response) => {
    try {
        const items = await ItemsModel.findAll({
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
        const item = await ItemsModel.create({
            collection_id: collection_id,
            author_id: author_id,
            name: name,
            image_url: image_url,
        })

        await ItemPropertyModel.bulkCreate(item_properties.map((property:
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
        const client = algoliasearch(
            process.env.ALGOLIA_APPLICATION_ID as string,
            process.env.ALGOLIA_ADMIN_API_KEY as string
        );
        const index = client.initIndex('items');
        const record = { objectID: item.id, name: item.name, image_url: item.image_url }
        
        await index.saveObject(record).wait();

        res.status(201).json({ message: 'collection created' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
});

router.get('/:id', async (req: Request, res = response) => {
    try {
        const item = await ItemsModel.findOne({
            where: { id: req.params.id },
            include: [{
                model: ItemPropertyModel,
                as: 'item_properties',
                include: [{
                    model: AdditionalFieldModel,
                    attributes: ['name', 'type'],
                    as: 'additional_field',
                }]
            },
                {
                    model: CollectionModel,
                    attributes: ['id', 'name'],
                    as: 'collection'
                },
                {
                    model: UserModel,
                    attributes: ['id', 'username'],
                    as: 'author'
                }
            ]
        });
        res.json(item)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;