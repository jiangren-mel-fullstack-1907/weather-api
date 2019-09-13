var ObjectId = require('mongodb').ObjectID;

class BaseRepository {
    constructor(Model) {
        this.Model = Model;
    }

    async getAll(query) {
        return this.Model.find(query);
    }

    async getById(id) {
        return this.Model.findOne({ _id: ObjectId(id) });
    }

    async getByField(field) {
        return this.Model.findOne(field);
    }

    async create(body) {
        return this.Model.create(body);
    }

    async put(id, body) {
        return this.Model.findOneAndReplace({ _id: ObjectId(id) }, body, { new: true });
    }

    async patch(id, body) {
        return this.Model.findOneAndUpdate({ _id: ObjectId(id) }, body, { new: true });
    }

    async deleteById(id, callback) {
        return this.Model.findOneAndDelete({ _id: ObjectId(id) });
    }
}

module.exports = BaseRepository;