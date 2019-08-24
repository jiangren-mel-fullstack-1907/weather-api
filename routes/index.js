var express = require('express');
var router = express.Router();
var weathersRouter = require('./weathers');
var citiesRouter = require('./cities');

router.use('/weathers', weathersRouter);
router.use('/cities', citiesRouter);

module.exports = router;
