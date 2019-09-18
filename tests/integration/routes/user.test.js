const request = require('supertest');
const server = require('../../../src/app');
const { TOKEN, TEST_USER } = require('../../data');

describe('/users', () => {
  describe('POST /', () => {
    const exec = data =>
      request(server)
        .post('/users')
        .send(data);

    it('should return 400 if name is missing', async () => {
      const user = {
        email: 'abc@test.com',
        password: '123456'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid email', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: 'test@'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is less than 6 chars', async () => {
      const user = {
        name: 'abcm',
        password: '12345',
        email: 'test2@test.com'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 201 if all fields are valid', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: 'test3@test.com'
      };
      const res = await exec(user);
      expect(res.status).toBe(201);
    });

    it('should return 400 if email already exist', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: TEST_USER.email
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });
  });  
  
  describe('POST /login', () => {
    const exec = data =>
      request(server)
        .post('/users/login')
        .send(data);

    it('should return 400 if invalid email', async () => {
      const user = {
        password: '123456',
        email: 'test@'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is less than 6 chars', async () => {
      const user = {
        password: '12345',
        email: 'test@test.com'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 200 with token if all fields are valid', async () => {
      const { email, password } = TEST_USER;
      const res = await exec({ email, password });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });

    it('should return 401 if incorrect password or email', async () => {
      const user = {
        password: '12345611111',
        email: TEST_USER.email
      };
      const res = await exec(user);
      expect(res.status).toBe(401);
    });
  });
});
