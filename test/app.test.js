const request = require('supertest');
const app = require('../app');

describe('GET /api/greet', () => {
  it('should return default greeting', async () => {
    const res = await request(app).get('/api/greet');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, Guest! Great to see you!');
  });

  it('should return personalized greeting', async () => {
    const res = await request(app).get('/api/greet?name=Dawa');
    expect(res.body.message).toBe('Hello, Dawa! Great to see you!');
  });
});

describe('GET /health', () => {
  it('should return ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
