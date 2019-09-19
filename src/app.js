var createError = require('http-errors');
require('envdotjson').load();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const { connectToDB } = require('./utils/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const swaggerSpec = YAML.load('./swagger/swagger.yaml');


var indexRouter = require('./routes/index');

const PORT = process.env.PORT || 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const morganLvl = process.env.NODE_ENV === 'production' ? 'short' : 'dev';
const morganLog = morgan(morganLvl, { stream: logger.stream });
app.use(morganLog);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(errorHandler);

connectToDB()
  .then(() => {
    logger.info('DB connected');
  })
  .catch(e => {
    logger.error('DB connection failed');
    throw new Error(e);
  });

module.exports = app;
