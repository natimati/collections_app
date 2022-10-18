import { Router, response, NextFunction, Request, Response } from "express";
import { compare } from "../helpers/auth";
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { generateSalt, hashPassword } from '../helpers/auth';
import usersModel from '../dataLayer/user';
import { tokenMaxAgeInSeconds } from '../constants'

const router = Router();

const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
}

router.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  validateInput
], async (req: Request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ where: { email }, rejectOnEmpty: true });
    const isPasswordMatch = compare(password, user.password, user.salt);
    if (!isPasswordMatch) {
      throw new Error("Password doesn't match");
    }
    const token = await jwt.sign({
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin,
      loginTime: user.last_login_time,
      registerTime: user.registration_time
    },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: tokenMaxAgeInSeconds }
    )
    return res.status(200).json({ id: user.id, token: token },
    );
  } catch {
    return res.status(401).json({
      message: "Either user name or password isn't correct"
    })
  }
});

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateInput
], async (req: Request, res = response) => {
  const { email, password, username } = req.body;
  const salt = generateSalt();
  const hash = hashPassword(password, salt);

  try {
    const user = await usersModel.create({
      username: username,
      email: email,
      password: hash.password,
      salt: salt
    })

    const { password, salt: userSalt, ...data } = user

    res.status(201).json({ message: 'user created', data })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'internal server error' })
  }
});

export default router;
