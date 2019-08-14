var express = require('express');
var router = express.Router();
var weathersRouter = require('./weathers');

router.use('/weathers', weathersRouter);

module.exports = router;
