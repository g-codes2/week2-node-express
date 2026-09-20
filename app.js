const express = require('express');
const path = require('path');

const app = express();

// Built-in middleware: parses JSON request bodies into req.body.
app.use(express.json());

// Bonus middleware: logs the method, path, and response time for every request.
app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
});

// Serve the static HTML page at the root route.
app.use('/', express.static(path.join(__dirname, 'public')));

// POST /user: accepts a name and email in JSON and greets the user.
app.post('/user', (req, res, next) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      error: 'Both name and email are required.'
    });
  }

  return res.status(201).json({
    message: `Hello, ${name}!`,
    user: { name, email }
  });
});

// GET /user/:id: reads the id from the URL path parameter.
app.get('/user/:id', (req, res) => {
  res.type('text').send(`User ${req.params.id} profile`);
});

// Handle invalid JSON sent to express.json().
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Request body contains invalid JSON.' });
  }

  return next(err);
});

// Final error handler for unexpected server errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
