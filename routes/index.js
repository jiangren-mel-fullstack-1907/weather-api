var express = require('express');
var router = express.Router();
var weathersRouter = require('./weathers');
var citiesRouter = require('./cities');
var usersRouter = require('./user');

router.use('/weathers', weathersRouter);
router.use('/cities', citiesRouter);
router.use('/users', usersRouter);

module.exports = router;
