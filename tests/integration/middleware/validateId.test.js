const request = require('supertest');

const server = require('../../../src/app');
const { TOKEN } = require('../../data');

describe('validate id', () => {
  it('should return 400 if id is invalid format', async () => {
    const res = await request(server)
      .get('/cities/123132')
      .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(400);
  });
});
