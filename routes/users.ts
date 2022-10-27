import { Request, response, Router } from "express";
import UserModel from '../dataLayer/user';
import CollectionModel from '../dataLayer/collection'

const router = Router();

router.get('/', async (req: Request, res = response) => {
    try {
        const users = await UserModel.findAll({
            attributes: { exclude: ['password', 'salt'] },
            include: [{
                model: CollectionModel,
                as: 'collections',
            }]
        })
        res.json(users)
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

export default router;