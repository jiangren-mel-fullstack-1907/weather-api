var ObjectId = require('mongodb').ObjectID;

const BaseRepository = require('./base');

const CitySchema = require('../models/city');
const WeatherSchema = require('../models/weather');

class CityRepository extends BaseRepository {
    constructor(CityModel, WeatherModel) {
        super(CityModel)
        this.WeatherModel = WeatherModel;
    }

    async addWeather(cityId, weatherId) {
        let aCity = await this.Model.findOne({ _id: ObjectId(cityId) });
        if (!aCity) {
            throw new Error('city not found');
        }
        await this.Model.findByIdAndUpdate(
            cityId,
            {
                $addToSet: {
                    weathers: weatherId
                }
            },
            {
                new: true
            }
        );
    }

    async removeWeather(cityId, weatherId) {
        let aCity = await this.Model.findOne({ _id: ObjectId(cityId) }).lean();
        if (!aCity) {
            throw new Error('city not found');
        }
        await this.Model.findByIdAndUpdate(
            cityId,
            {
                $pull: {
                    weathers: weatherId
                }
            },
            {
                new: true
            }
        );
    }

    async getWeathersByCityId(id) {
        return this.Model.findOne({ _id: ObjectId(id) }).populate('weathers');
    }

    async getAllWithWeathers(query) {
        return this.Model.find(query).populate('weathers');
    }
}

let cityRepository = new CityRepository(CitySchema, WeatherSchema);
module.exports = cityRepository;