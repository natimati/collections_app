const { Router, response } = require('express');
const router = Router();

const { check, validationResult } = require('express-validator');
const { generateSalt, hashPassword } = require('../helpers/auth');
const usersModel = require('../dataLayer/users')

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

router.post('/login', [
    check('email', 'Email is required').isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ where: { email }, rejectOnEmpty: true });
        const isPasswordMatch = compare(password, user.password, user.salt);
        if (!isPasswordMatch) {
            throw new Error("Password doesn't match");
        }
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
], async (req, res = response) => {
    const { email, password, username } = req.body;
    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    try {
        const user = await usersModel.create({
            username: username,
            email: email,
            password: hash,
            salt: salt
        })

        const { password, salt, ...data } = user

        res.status(201).json({ message: 'user created', data })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' })
    }
});

module.exports = router;