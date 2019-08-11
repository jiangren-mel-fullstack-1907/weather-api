var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;

class WeatherRepository {
    constructor() {
        // MongoClient.connect('mongodb://192.168.99.100:27017/weather-api', (err, db) => {
        //     this.collection = db.collection('city-weathers');
        // })
        MongoClient.connect('mongodb://user01:user01@ds151463.mlab.com:51463/pigeon', (err, db) => {
            this.collection = db.collection('cheng-city-weathers');
        })
    }

    getAll(query, callback) {
        console.log('weathers repository getAll query ===>>>', query);
        this.collection.find(query).toArray(function (err, docs) {
            callback(docs);
        });
    }

    getById(id, callback) {
        this.collection.findOne({_id: ObjectId(id)}, function(err, result) {
            console.log('result ===>>>', result);
            callback(result, err);
        })
    }

    create(body, callback) {
        this.collection.insertOne(body, function(err, result) {
            callback(result.ops[0], err);
        })
    }

    put(id, body, callback) {
        this.collection.findOneAndReplace({_id: ObjectId(id)}, {$set: body}, {returnNewDocument: true}, function(err, result) {
            console.log('result ===>>>', result);
            callback(result.value, err);
        });
    }

    patch(id, body, callback) {
        console.log('')
        this.collection.findOneAndUpdate({_id: ObjectId(id)}, {$set: body,}, {returnNewDocument: true}, function(err, result) {
            console.log('result ===>>>', result);
            callback(result.value, err);
        });
    }

    deleteById(id, callback) {
        this.collection.findOneAndDelete({_id: ObjectId(id)}, function(err, result) {
            console.log('result ===>>>', result);
            callback(result.value, err);
        })
    }
}

let weatherRepository = new WeatherRepository();
module.exports = weatherRepository;