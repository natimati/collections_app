import { Request, response, Router } from "express";
import usersModel from '../dataLayer/user';
import collectionsModel from '../dataLayer/collection';
import itemsModel from '../dataLayer/item';
import isAdminMiddleware from "../middlewares/isAdmin";
import algoliasearch from "algoliasearch";

const router = Router();

router.get('/',
    [isAdminMiddleware],
    async (req: Request, res = response) => {
    try {
        const users = await usersModel.findAll({
            attributes: { exclude: ['password', 'salt'] },
            include: [{
                model: collectionsModel,
                as: 'collections',
            }]
        })
        res.json(users)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.post('/role-change',
    [isAdminMiddleware],
    async (req: Request, res = response) => {
        try {
            await usersModel.update({ is_admin: req.body.isAdmin },
                { where: { id: req.body.userIds } });
            res.status(200).send({ message: 'Success'})
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: 'Faild to change user role'});
        }
    });

router.delete('/delete', [isAdminMiddleware], async (req: Request, res = response) => {
    try {
        const items = await itemsModel.findAll({
            where: { author_id: req.body.userIds },
            attributes: ['id']
        })
        await usersModel.destroy({ where: { id: req.body.userIds } })
        const client = algoliasearch(
            process.env.ALGOLIA_APPLICATION_ID as string,
            process.env.ALGOLIA_ADMIN_API_KEY as string
        );
        const index = client.initIndex('items');

        await index.deleteObjects(items.map((item) => {
            return item.id
        }));
        
        res.status(200).send({ message: 'Success'})
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Faild to delete user' });
    }
})

export default router;