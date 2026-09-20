const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('./app');

test('GET / serves the static home page', async () => {
  const response = await request(app).get('/');

  assert.equal(response.status, 200);
  assert.match(response.text, /My Week 2 API!/);
});

test('POST /user returns a greeting for valid data', async () => {
  const response = await request(app)
    .post('/user')
    .send({ name: 'Ada', email: 'ada@example.com' });

  assert.equal(response.status, 201);
  assert.deepEqual(response.body, {
    message: 'Hello, Ada!',
    user: { name: 'Ada', email: 'ada@example.com' }
  });
});

test('POST /user returns 400 when data is missing', async () => {
  const response = await request(app)
    .post('/user')
    .send({ name: 'Ada' });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Both name and email are required.');
});

test('GET /user/:id returns the requested profile message', async () => {
  const response = await request(app).get('/user/42');

  assert.equal(response.status, 200);
  assert.equal(response.text, 'User 42 profile');
});

test('POST /user returns 400 for malformed JSON', async () => {
  const response = await request(app)
    .post('/user')
    .set('Content-Type', 'application/json')
    .send('{"name":');

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Request body contains invalid JSON.');
});
