import { Request, response, Router } from "express";
import UserModel from '../dataLayer/user';
import CollectionModel from '../dataLayer/collection'
import isAdminMiddleware from "../middlewares/isAdmin";

const router = Router();

router.get('/',
    [isAdminMiddleware],
    async (req: Request, res = response) => {
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

router.post('/role-change',
    [isAdminMiddleware],
    async (req: Request, res = response) => {
        try {
            await UserModel.update({ is_admin: req.body.isAdmin },
                { where: { id: req.body.userIds } });
            res.status(200).send({ message: 'Success'})
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: 'Faild to change user role'});
        }
    });

router.delete('/delete', [isAdminMiddleware], async (req: Request, res = response) => {
    try {
        await UserModel.destroy({ where: { id: req.body.userIds } })
        res.status(200).send({ message: 'Success'})
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Faild to delete user' });
    }
})

export default router;