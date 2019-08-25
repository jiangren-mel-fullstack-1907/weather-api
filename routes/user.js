const express = require('express');
const authGuard = require('../middlewares/authGuard');
const validateAuth = require('../middlewares/validateAuth');
const userRepository = require('../repositories/user');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

// router.get('/me', authGuard, getSelf);

// router.post('/login', validateAuth, login);


router.post('/', validateAuth, async function addUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const existingUser = await userRepository.getByField({ email });
        if (existingUser) {
            res.status(400).send('Email already exists');
        }
        const user = await userRepository.create({ name, password, email });
        const token = generateToken(user._id);
        res.status(201).json({ email, name, token });
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;
