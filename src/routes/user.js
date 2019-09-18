const express = require('express');
const validateAuth = require('../middlewares/validateAuth');
const userRepository = require('../repositories/user');
const { generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../utils/asyncHandler');
const { formatResponse } = require('../utils/helper');

const router = express.Router();

router.post('/login', validateAuth, asyncHandler(async function (req, res, next) {
    const { email, password } = req.body;
    const user = await userRepository.validateUser(email, password);
    if (!user) {
        return formatResponse(res, 'Invalid email or password.', 401);
    }

    const token = generateToken(user._id);
    return formatResponse(res, { name: user.name, token });
}));


router.post('/', validateAuth, asyncHandler(async function (req, res, next) {
    const { email, password, name } = req.body;
    const existingUser = await userRepository.getByField({ email });
    if (existingUser) {
        return formatResponse(res, 'Email already exists', 400);
    }
    const user = await userRepository.create({ name, password, email });
    return formatResponse(res, user, 201);
}));

module.exports = router;
