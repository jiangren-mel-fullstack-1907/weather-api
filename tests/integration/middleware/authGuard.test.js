const request = require('supertest');

const server = require('../../../src/app');
const { TOKEN } = require('../../data');

describe('authGuard', () => {
  const exec = token =>
    request(server)
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);

  it('should return 401 if no header is provided', async () => {
    const res = await request(server).get('/cities');

    expect(res.status).toBe(401);
  });

  it('should return 401 if no bearer is provided', async () => {
    const res = await request(server)
      .get('/cities')
      .set('Authorization', `${TOKEN}`);

    expect(res.status).toBe(401);
  });

  it('should return 401 if no token is provided', async () => {
    const res = await exec('');

    expect(res.status).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    const res = await exec('invalid');

    expect(res.status).toBe(401);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec(TOKEN);

    expect(res.status).toBe(200);
  });
});
