const request = require('supertest');
const app = require('../app');

describe('GET /api/greet', () => {
  it('should return default greeting', async () => {
    const res = await request(app).get('/api/greet');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, Guest!');
  });

  it('should return personalized greeting', async () => {
    const res = await request(app).get('/api/greet?name=Huseyin');
    expect(res.body.message).toBe('Hello, Huseyin!');
  });
});