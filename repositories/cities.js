var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;

const CitySchema = require('../models/city');
const WeatherSchema = require('../models/weather');

class CityRepository {
    constructor(CityModel, WeatherModel) {
        this.CityModel = CityModel;
        this.WeatherModel = WeatherModel;
    }

    async getAll(query) {
        return this.CityModel.find(query);
    }

    async getById(id) {
        return this.CityModel.findOne({ _id: ObjectId(id) }).populate('weathers');
    }

    async create(body) {
        return this.CityModel.create(body);
    }

    async addWeather(cityId, weatherId) {
        let aCity = await this.CityModel.findOne({ _id: ObjectId(cityId) });
        if (!aCity) {
            throw new Error('city not found');
        }
        aCity.weathers.push(weatherId);
        await aCity.save();
    }

    async removeWeather(cityId, weatherId) {
        let aCity = await this.CityModel.findOne({ _id: ObjectId(cityId) });
        if (!aCity) {
            throw new Error('city not found');
        }
        const index = aCity.weathers.indexOf(weatherId);
        if (index > -1) {
            aCity.weathers.splice(index, 1);
        }
        await aCity.save();
    }

    async put(id, body) {
        return this.CityModel.findOneAndReplace({ _id: ObjectId(id) }, body, { new: true });
    }

    async patch(id, body) {
        return this.CityModel.findOneAndUpdate({ _id: ObjectId(id) }, body, { new: true });
    }

    async deleteById(id) {
        return this.CityModel.findOneAndDelete({ _id: ObjectId(id) });
    }
}

let cityRepository = new CityRepository(CitySchema, WeatherSchema);
module.exports = cityRepository;