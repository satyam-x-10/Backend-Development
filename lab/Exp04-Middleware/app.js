const express = require('express');
const path = require('path');
const app = express();
const PORT = 3004;

// ─── 1. Custom Logger Middleware ───────────────────────────────────────────────
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// ─── 2. Built-in Body Parser Middleware ───────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── 3. Static File Serving Middleware ────────────────────────────────────────
app.use('/static', express.static(path.join(__dirname, 'public')));

// ─── 4. Auth Guard Middleware (example) ───────────────────────────────────────
function authGuard(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || token !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized – missing or invalid token' });
  }
  next();
}

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Exp04 – Express Middleware Demo',
    routes: ['GET /', 'GET /public-data', 'GET /private-data', 'POST /echo']
  });
});

app.get('/public-data', (req, res) => {
  res.json({ data: 'This is public – no auth needed.' });
});

app.get('/private-data', authGuard, (req, res) => {
  res.json({ data: 'This is private – only reached with correct token.' });
});

app.post('/echo', (req, res) => {
  res.json({ received: req.body });
});

// ─── 5. 404 Handler Middleware ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} not found` });
});

// ─── 6. Error Handling Middleware (must have 4 params) ────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Exp04-Middleware server running at http://localhost:${PORT}`);
  console.log('Try:');
  console.log('  GET  http://localhost:3004/public-data');
  console.log('  GET  http://localhost:3004/private-data  (needs header x-auth-token: secret123)');
  console.log('  POST http://localhost:3004/echo  with JSON body');
});
