const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory session store (maps sessionId -> session object)
const sessions = new Map();
const tasks = [
  { id: 1, title: 'Review HTTP status codes', status: 'done' },
  { id: 2, title: 'Implement cookie parser', status: 'in-progress' }
];

// Lightweight cookie parser middleware
function parseCookies(req, res, next) {
  req.cookies = {};
  const header = req.headers.cookie;
  if (header) {
    header.split(';').forEach((pair) => {
      const idx = pair.indexOf('=');
      if (idx > -1) {
        const key = pair.slice(0, idx).trim();
        const val = decodeURIComponent(pair.slice(idx + 1).trim());
        req.cookies[key] = val;
      }
    });
  }
  next();
}

app.use(parseCookies);

// 1. Inspect incoming HTTP request metadata
app.get('/api/inspect', (req, res) => {
  res.json({
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    cookies: req.cookies
  });
});

// 2. Cookie endpoints
app.get('/cookie/set', (req, res) => {
  const theme = req.query.theme || 'light';
  res.setHeader('Set-Cookie', `theme=${encodeURIComponent(theme)}; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax`);
  res.json({ message: 'Cookie stored on client', cookie: { theme } });
});

app.get('/cookie/read', (req, res) => {
  res.json({ cookies: req.cookies });
});

app.get('/cookie/clear', (req, res) => {
  res.setHeader('Set-Cookie', 'theme=; Path=/; Max-Age=0');
  res.json({ message: 'Cookie cleared' });
});

// 3. Server-side Session endpoints
app.post('/session/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  const sid = crypto.randomBytes(16).toString('hex');
  sessions.set(sid, { username, loginTime: new Date().toISOString(), visits: 1 });
  res.setHeader('Set-Cookie', `sid=${sid}; Path=/; HttpOnly; SameSite=Lax`);
  res.json({ message: 'Session created', sid, user: username });
});

app.get('/session/profile', (req, res) => {
  const sid = req.cookies.sid;
  const session = sid ? sessions.get(sid) : null;
  if (!session) {
    return res.status(401).json({ error: 'No active session found. Please log in first.' });
  }
  session.visits += 1;
  res.json({ sid, session });
});

app.post('/session/logout', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) sessions.delete(sid);
  res.setHeader('Set-Cookie', 'sid=; Path=/; Max-Age=0');
  res.json({ message: 'Session destroyed' });
});

// 4. RESTful Tasks API
app.get('/api/tasks', (req, res) => res.json({ count: tasks.length, tasks }));

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Task title is required' });
  const task = { id: tasks.length + 1, title, status: 'pending' };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(PORT, () => {
  console.log(`Unit 1 server listening on http://localhost:${PORT}`);
});
