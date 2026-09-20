# Week 2 Node + Express API

A beginner-friendly implementation of the BeTechified Week 2 backend assignment.

## What this project demonstrates

- Express application setup
- `GET /` serving a static HTML page
- `POST /user` reading JSON from `req.body`
- `GET /user/:id` reading a URL parameter from `req.params`
- `express.json()` JSON parsing
- `400` validation errors for missing data and malformed JSON
- `.env` configuration for the port
- Custom request-logging middleware
- Automated tests with Node's built-in test runner and Supertest

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

The server starts on `http://localhost:3000` unless `PORT` is changed in `.env`.

For automatic restart during development:

```bash
npm run dev
```

## Test the API with curl

Open the static page:

```bash
curl http://localhost:3000/
```

Create a user greeting:

```bash
curl -i -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com"}'
```

Expected status: `201 Created`.

Try the validation error:

```bash
curl -i -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada"}'
```

Expected status: `400 Bad Request`.

Get a profile message:

```bash
curl -i http://localhost:3000/user/42
```

## Run automated tests

```bash
npm test
```

## Beginner explanation

**Express** is a Node.js framework that makes it easier to create an HTTP server. A route connects an HTTP method and URL to a function. For example, `app.get('/user/:id', handler)` means “when a client sends a GET request to a URL such as `/user/42`, run this handler.”

**Middleware** is a function that runs during the request-response journey. `express.json()` is built-in middleware that reads JSON request data and makes it available as `req.body`. The custom logger runs for every request, calls `next()` so the request can continue, and records the final status when the response finishes.

**Status codes** communicate the result. This project uses `200` for successful reads, `201` when a user greeting is created, `400` when the client sends invalid or incomplete data, and `500` for unexpected server errors.

**Environment variables** keep deployment-specific values such as the port outside the source code. The real `.env` file is ignored by Git; `.env.example` documents the required variable without exposing private values.

## Project structure

```text
week2-node-express/
├── app.js             # Express app, middleware, routes, errors
├── server.js          # Loads .env and starts the server
├── app.test.js        # Automated endpoint tests
├── public/index.html  # Static page served at /
├── .env.example       # Safe environment variable template
├── .gitignore         # Files Git should ignore
└── package.json       # Dependencies and npm scripts
```
