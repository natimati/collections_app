import { Request, response, Router } from "express";
import authMiddleware from "../middlewares/auth";
import commentsModel from "../dataLayer/comment";
import userModel from "../dataLayer/user";

const router = Router();

router.post('/create', [authMiddleware], async (req: Request, res = response) => {
  const { item_id, author_id, body } = req.body;

  try {
    await commentsModel.create({
      item_id: item_id,
      author_id: author_id,
      body: body
    })
    res.status(201).json({ message: 'collection created' })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'internal server error' })
  }
});

router.get('/item/:itemId', async (req: Request, res = response) => {
  try {
    const comments = await commentsModel.findAll({
      where: { item_id: req.params.itemId },
      include: [
      {
        model: userModel,
        attributes: ['id', 'username'],
        as: 'author'
        }
      ]
    });
    res.json(comments)
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

export default router;
