import algoliasearch from "algoliasearch";
import { Request, response, Router } from "express";
import itemsModel from "../dataLayer/item";
import isAdminMiddleware from "../middlewares/isAdmin";

const router = Router();

router.post('/sync', [isAdminMiddleware], async (req: Request, res = response) => {
    try {
        const results = await itemsModel.findAll();

        const client = algoliasearch(
            process.env.ALGOLIA_APPLICATION_ID as string,
            process.env.ALGOLIA_ADMIN_API_KEY as string
        );
        const index = client.initIndex('items');

        const records = results.map((item) => ({ objectID: item.id, name: item.name, image_url: item.image_url }))

        let batches: (typeof records)[] = [];

        const chunkSize = 1000;
        for (let i = 0; i < records.length; i += chunkSize) {
            batches.push(records.slice(i, i + chunkSize))
        }

        await Promise.all(
            batches.map(batch => {
                return index.saveObjects(batch)
            })
        )

        res.json({ message: "Successfully synchornized records" })
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;