var ObjectId = require('mongodb').ObjectID;
const BaseRepository = require('./base');

const WeatherSchema = require('../models/weather');

class WeatherRepository extends BaseRepository {
}

let weatherRepository = new WeatherRepository(WeatherSchema);
module.exports = weatherRepository;