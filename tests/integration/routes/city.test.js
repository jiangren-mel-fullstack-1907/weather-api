const { ObjectId } = require('mongoose').Types;

const request = require('supertest');
const Student = require('../../../src/models/weather');
const City = require('../../../src/models/city');
const server = require('../../../src/app');
const { TOKEN } = require('../../data');

beforeAll(async () => {
  await City.deleteMany({});
});

describe('/cities', () => {
  describe('GET /', () => {
    const cities = [
      {
        _id: '5d60781c78fad12adcee242a',
        name: 'Melbourne',
        post: '3000',
        weathers: []
      },
      {
        _id: '5d60781c78fad12adcee242b',
        name: 'Sydney',
        post: '2000',
        weathers: []
      },
      {
        _id: '5d60781c78fad12adcee242c',
        name: 'Richmond',
        post: '3000',
        weathers: []
      }
    ];
    const exec = query =>
      request(server)
        .get(`/cities${query ? `?${query}` : ''}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    beforeAll(async () => {
      await City.insertMany(cities);
    });

    afterAll(async () => {
      await City.deleteMany({});
    });

    it('should return all cities', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });

    it('should return 1 city with search key', async () => {
      const res = await exec('name=Richmond');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0]).toMatchObject(cities[2]);
    });
  });

  describe('POST /', () => {
    const exec = body =>
      request(server)
        .post(`/cities`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(body);

    it('should return 400 if name is missing', async () => {
      const city = {
        post: '3150'
      };
      const res = await exec(city);
      expect(res.status).toBe(400);
    });

    it('should return 201 if all fields are valid', async () => {
      const city = {
        name: 'Glen Waverley',
        post: '3150'
      };
      const res = await exec(city);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /:id', () => {
    const fields = {
      name: 'Glen Waverley',
      post: '3150'
    };
    const city = new City(fields);

    const exec = id =>
      request(server)
        .get(`/cities/${id}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    beforeAll(async () => {
      await city.save();
    });

    it('should return 404 if object id not exist', async () => {
      const id = new City()._id;
      const res = await exec(id);
      expect(res.status).toBe(404);
    });

    it('should return 200 if object id exist', async () => {
      const res = await exec(city._id);
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject(fields);
    });
  });

  describe('PUT /:id', () => {
    const fields = {
      name: 'Glen Waverley',
      post: '3150'
    };
    const city = new City(fields);

    const exec = (id, body) =>
      request(server)
        .put(`/cities/${id}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(body);

    beforeAll(async () => {
      await city.save();
    });

    it('should return 404 if object id not exist', async () => {
      const id = new City()._id;
      const res = await exec(id, {});
      expect(res.status).toBe(404);
    });

    it('should update the document if object id exist', async () => {
      const newDoc = {
        name: 'Glen Waverley',
        post: '3000'
      };
      const res = await exec(city._id, newDoc);
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject(newDoc);
    });

    it('should return 400 if the update object is invalid', async () => {
      const newDoc = {
        name: 'n'
      };
      const res = await exec(city._id, newDoc);
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /:id', () => {
    const fields = {
      name: 'Glen Waverley',
      post: '3150'
    };
    const city = new City(fields);

    const exec = id =>
      request(server)
        .delete(`/cities/${id}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    beforeAll(async () => {
      await city.save();
    });

    it('should return 404 if object id not exist', async () => {
      const id = new City()._id;
      const res = await exec(id);
      expect(res.status).toBe(404);
    });
  });
});
