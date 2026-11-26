// Exp07+08 – RESTful API with JWT Authentication
// Exp 07: CRUD REST API for Books resource
// Exp 08: JWT-based login & protected routes

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3007;
const SECRET = process.env.JWT_SECRET || 'mySuperSecretKey2026';

// ─── In-Memory Data ───────────────────────────────────────────────────────────
let books = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', genre: 'Tech', year: 1999 },
  { id: 2, title: 'Clean Code',               author: 'Robert Martin',  genre: 'Tech', year: 2008 },
  { id: 3, title: 'You Don\'t Know JS',        author: 'Kyle Simpson',   genre: 'Tech', year: 2015 },
];
let nextId = 4;

// Hardcoded users (in real apps use a DB)
const users = [
  { id: 1, username: 'satyam', passwordHash: bcrypt.hashSync('password123', 10), role: 'admin' },
];

// ─── Middleware: JWT Auth Guard ───────────────────────────────────────────────
function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided. Send: Authorization: Bearer <token>' });
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ─── EXP 08: Auth Routes ─────────────────────────────────────────────────────
// POST /auth/login → returns JWT token
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token, expiresIn: '1h' });
});

// GET /auth/me → protected – returns logged-in user info
app.get('/auth/me', protect, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

// ─── EXP 07: Books CRUD API ──────────────────────────────────────────────────
// GET /api/books – list all (public)
app.get('/api/books', (req, res) => {
  const { genre, author } = req.query;
  let result = books;
  if (genre)  result = result.filter(b => b.genre.toLowerCase()  === genre.toLowerCase());
  if (author) result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  res.json({ count: result.length, books: result });
});

// GET /api/books/:id – single book (public)
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /api/books – create (protected)
app.post('/api/books', protect, (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
  const book = { id: nextId++, title, author, genre: genre || 'General', year: year || new Date().getFullYear() };
  books.push(book);
  res.status(201).json({ message: 'Book created', book });
});

// PUT /api/books/:id – update (protected)
app.put('/api/books/:id', protect, (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body, id: books[idx].id };
  res.json({ message: 'Book updated', book: books[idx] });
});

// DELETE /api/books/:id – delete (protected)
app.delete('/api/books/:id', protect, (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  const deleted = books.splice(idx, 1);
  res.json({ message: 'Book deleted', book: deleted[0] });
});

// ─── API Index ────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Exp07+08 – RESTful Books API with JWT Auth',
    auth: { login: 'POST /auth/login', me: 'GET /auth/me (protected)' },
    books: {
      list:   'GET  /api/books?genre=Tech',
      single: 'GET  /api/books/:id',
      create: 'POST /api/books (protected)',
      update: 'PUT  /api/books/:id (protected)',
      delete: 'DELETE /api/books/:id (protected)',
    }
  });
});

app.listen(PORT, () => console.log(`Exp07+08 API running at http://localhost:${PORT}`));
