var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;

class WeatherRepository {
    constructor() {
        MongoClient.connect('mongodb://192.168.99.100:27017/weather-api', (err, db) => {
            this.collection = db.collection('city-weathers');
        })
        // MongoClient.connect('mongodb://user01:user01@ds151463.mlab.com:51463/pigeon', (err, db) => {
        //     this.collection = db.collection('cheng-city-weathers');
        // })
    }

    getAll(query) {
        return new Promise((resolve, reject) => {
            this.collection.find(query).toArray(function (err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({_id: ObjectId(id)}, function(err, result) {
                if (err) reject(err);
                else resolve(result);
            })
        })
    }

    create(body) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(body, function(err, result) {
                if (err) reject(err);
                else resolve(result.ops[0]);
            })
        })
    }

    put(id, body) {
        return new Promise((resolve, reject) => {
            this.collection.findOneAndReplace({_id: ObjectId(id)}, {$set: body}, {returnNewDocument: true}, function(err, result) {
                if (err) reject(err);
                else resolve(result.value);
            });
        })
    }

    patch(id, body) {
        return new Promise((resolve, reject) => {
            this.collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: body,}, {returnNewDocument: true}, function(err, result) {
                if (err) reject(err);
                else resolve(result.value);
            });
        })
    }

    deleteById(id, callback) {
        return new Promise((resolve, reject) => {
            this.collection.findOneAndDelete({_id: ObjectId(id)}, function(err, result) {
                if (err) reject(err);
                else resolve(result.value);
            })
        })
    }
}

let weatherRepository = new WeatherRepository();
module.exports = weatherRepository;