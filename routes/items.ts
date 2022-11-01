import { Request, response, Router } from "express";
import additionalFieldModel from "../dataLayer/additionalField";
import collectionModel from "../dataLayer/collection";
import itemsModel from "../dataLayer/item";
import itemPropertyModel from '../dataLayer/itemProperty';
import userModel from "../dataLayer/user";
import commentsModel from "../dataLayer/comment"
import authMiddlewere from "../middlewares/auth";
import algoliasearch from "algoliasearch";
import isItemAuthorAtLeast from "../middlewares/isItemAuthorAtLeast";
import sanitize from "sanitize-html";

const router = Router();

router.get('/latest', async (req: Request, res = response) => {
  try {
    const items = await itemsModel.findAll({
      order: [
        ['created_at', 'DESC']
      ],
      limit: 5,
      include: [{
        model: collectionModel,
        attributes: ['id', 'name'],
        as: 'collection'
      },
      {
        model: userModel,
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

router.get('/collection/:collectionId', async (req: Request, res = response) => {
  try {
    const items = await itemsModel.findAll({
      where: { collection_id: req.params.collectionId },
      include: [
        {
          model: commentsModel,
          attributes: ['id'],
          as: 'comments'
        }
      ]
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
      const sanitizedValue = sanitize(property.value);

      return ({
        additional_field_id: property.additional_field_id,
        collection_id: item.collection_id,
        item_id: item.id,
        value: sanitizedValue
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


router.get('/:itemId', async (req: Request, res = response) => {
  try {
    const item = await itemsModel.findOne({
      where: { id: req.params.itemId },
      include: [{
        model: itemPropertyModel,
        as: 'item_properties',
        include: [{
          model: additionalFieldModel,
          attributes: ['name', 'type'],
          as: 'additional_field',
        }]
      },
      {
        model: collectionModel,
        attributes: ['id', 'name'],
        as: 'collection',
        include: [{
          model: additionalFieldModel,
          attributes: ['id', 'name', 'type'],
          as: 'additional_fields',
        }]
      },
      {
        model: userModel,
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

router.post('/update/:itemId', [isItemAuthorAtLeast], async (req: Request, res = response) => {
  const { id, name, image_url, item_properties, collection_id } = req.body;

  try {
    await itemsModel.update({
      name: name,
      image_url: image_url,
      updated_at: new Date(),
    }, { where: { id: req.params.itemId } })

    await itemPropertyModel.bulkCreate(item_properties.map((property: { id: string, value: string, additional_field_id: string }) => {
      const sanitizedValue = sanitize(property.value);
      return ({
        additional_field_id: property.additional_field_id,
        item_id: id,
        id: property.id,
        value: sanitizedValue,
        collection_id
      })
    }), { updateOnDuplicate: ['value'] });

    const client = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID as string,
      process.env.ALGOLIA_ADMIN_API_KEY as string
    );
    const index = client.initIndex('items');
    const record = { objectID: req.params.itemId, name, image_url }

    await index.partialUpdateObject(record, { createIfNotExists: true, }).wait();

    res.status(201).json({ message: 'collection updated' })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'internal server error' })
  }
});

router.delete('/delete', [isItemAuthorAtLeast], async (req: Request, res = response) => {
  try {
    await itemsModel.destroy({
      where: { id: req.body.itemId }
    });
    const client = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID as string,
      process.env.ALGOLIA_ADMIN_API_KEY as string
    );
    const index = client.initIndex('items');

    await index.deleteObject(req.body.itemId);
    res.status(200).send({ message: 'Success' });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Faild to delete user' });
  }
});

export default router;