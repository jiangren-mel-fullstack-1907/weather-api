var express = require('express');
var router = express.Router();
var weathersRouter = require('./weathers');
var citiesRouter = require('./cities');
var usersRouter = require('./user');
const authGuard = require('../middlewares/authGuard');

router.use('/weathers', weathersRouter);
router.use('/cities', authGuard, citiesRouter);
router.use('/users', usersRouter);

module.exports = router;
