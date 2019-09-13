const express = require('express');
const validateAuth = require('../middlewares/validateAuth');
const userRepository = require('../repositories/user');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

router.post('/login', validateAuth, async function (req, res) {
    const { email, password } = req.body;
    const user = await userRepository.validateUser(email, password);
    if (!user) {
        return res.status(401).send('Invalid email or password.')
    }

    const token = generateToken(user._id);
    return res.json({ name: user.name, token });
});


router.post('/', validateAuth, async function addUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const existingUser = await userRepository.getByField({ email });
        if (existingUser) {
            res.status(400).send('Email already exists');
        }
        const user = await userRepository.create({ name, password, email });
        res.status.json(user);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;
