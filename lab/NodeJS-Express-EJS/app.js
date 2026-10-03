// ============================================================
// Experiment 12 – Node.js, NPM, Express, Nodemon and EJS
// Satyam Koranga | Backend Development Lab | UPES 2026
// ============================================================
// How to run:
//   npm install          (installs express, ejs, nodemon)
//   npm run dev          (starts server with nodemon on port 3000)
//   npm start            (starts server with node on port 3000)
// ============================================================

const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = 3000;

// ─── 1. MIDDLEWARE ────────────────────────────────────────────
// Parse URL-encoded form bodies (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(express.json());
// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ─── 2. TEMPLATE ENGINE (EJS) ────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── 3. SIMPLE LOGGER MIDDLEWARE ─────────────────────────────
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route
});

// ─── 4. ROUTES ───────────────────────────────────────────────

// HOME – demonstrates res.render() with EJS
app.get('/', (req, res) => {
  res.render('index', {
    title:  'Experiment 12 – Node.js & Express',
    author: 'Satyam Koranga',
    year:   new Date().getFullYear(),
    routes: [
      { path: '/',           desc: 'Home – EJS render' },
      { path: '/text',       desc: 'res.send() – plain text' },
      { path: '/html',       desc: 'res.send() – HTML string' },
      { path: '/json',       desc: 'res.json() – JSON response' },
      { path: '/status',     desc: 'res.status(201) – custom status' },
      { path: '/user/42',    desc: 'Route param – :id' },
      { path: '/product/electronics/99', desc: 'Multi-params – :cat/:id' },
      { path: '/search?q=node&page=2',   desc: 'Query params' },
      { path: '/calculate?num1=15&num2=5&operation=add', desc: 'Calc query' },
      { path: '/form',       desc: 'POST form with EJS render' },
      { path: '/students',   desc: 'EJS loop – student table' },
      { path: '/about',      desc: 'Static EJS page' },
    ]
  });
});

// PLAIN TEXT RESPONSE
app.get('/text', (req, res) => {
  res.send('Hello from Express! This is a plain text response.');
});

// HTML STRING RESPONSE
app.get('/html', (req, res) => {
  res.send(`
    <html><head><title>HTML Response</title>
    <link rel="stylesheet" href="/style.css"></head>
    <body>
      <nav class="navbar"><a href="/">← Home</a></nav>
      <div class="container"><div class="card">
        <h1>HTML Response via res.send()</h1>
        <p>This HTML string was generated directly in the route handler — no template engine used.</p>
        <p><strong>Endpoint:</strong> <code>GET /html</code></p>
      </div></div>
    </body></html>
  `);
});

// JSON RESPONSE
app.get('/json', (req, res) => {
  res.json({
    status:  'success',
    message: 'This is a JSON response from Express',
    student: { name: 'Satyam Koranga', course: 'Backend Development', year: 2026 },
    server:  { node: process.version, express: require('./node_modules/express/package.json').version }
  });
});

// CUSTOM HTTP STATUS
app.get('/status', (req, res) => {
  res.status(201).json({
    status:  201,
    message: 'Resource Created Successfully (HTTP 201)',
    hint:    'Use res.status(code).json() to send status with JSON body.'
  });
});

// ROUTE PARAMETER – :id
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.render('user', {
    title: `User #${id}`,
    userId: id,
    user: {
      id,
      name:    `Student ${id}`,
      email:   `student${id}@upes.ac.in`,
      course:  'Backend Development',
      enrolled: new Date().getFullYear()
    }
  });
});

// MULTI ROUTE PARAMETERS – :category/:id
app.get('/product/:category/:id', (req, res) => {
  const { category, id } = req.params;
  res.json({
    product:  { id, category, name: `${category} item #${id}`, price: (parseInt(id) * 9.99).toFixed(2) },
    note:     'Multi-param route: /product/:category/:id'
  });
});

// QUERY PARAMETERS – search
app.get('/search', (req, res) => {
  const { q = '', page = 1, limit = 10 } = req.query;
  const mockResults = q
    ? [`${q} tutorial`, `${q} docs`, `${q} examples`, `${q} npm`].slice(0, parseInt(limit))
    : [];
  res.json({ query: q, page: parseInt(page), limit: parseInt(limit), results: mockResults });
});

// QUERY PARAMETERS – calculator
app.get('/calculate', (req, res) => {
  const { num1, num2, operation = 'add' } = req.query;
  const n1 = parseFloat(num1), n2 = parseFloat(num2);
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: 'Please provide valid num1 and num2 query params.' });
  }
  const ops = { add: n1 + n2, subtract: n1 - n2, multiply: n1 * n2, divide: n2 !== 0 ? n1 / n2 : 'undefined' };
  res.json({ num1: n1, num2: n2, operation, result: ops[operation] ?? 'Unknown operation' });
});

// GET FORM PAGE
app.get('/form', (req, res) => {
  res.render('form', { title: 'Submit Form', result: null, error: null });
});

// POST FORM – handle form submission
app.post('/form', (req, res) => {
  const { name, email, age, course } = req.body;
  if (!name || !email) {
    return res.render('form', { title: 'Submit Form', result: null, error: 'Name and Email are required!' });
  }
  res.render('form', {
    title:  'Submit Form',
    error:  null,
    result: { name, email, age: age || 'N/A', course: course || 'N/A', submittedAt: new Date().toLocaleString() }
  });
});

// STUDENTS LIST – EJS loop demo
const students = [
  { id: 1, name: 'Satyam Koranga', branch: 'CSE',  marks: 95 },
  { id: 2, name: 'Priya Sharma',   branch: 'ECE',  marks: 88 },
  { id: 3, name: 'Rahul Gupta',    branch: 'CSE',  marks: 92 },
  { id: 4, name: 'Neha Singh',     branch: 'IT',   marks: 85 },
  { id: 5, name: 'Aditya Verma',   branch: 'MECH', marks: 79 },
];

app.get('/students', (req, res) => {
  const avg = (students.reduce((s, st) => s + st.marks, 0) / students.length).toFixed(2);
  res.render('students', { title: 'Student List', students, avg });
});

// ABOUT – static EJS page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About This App',
    stack: ['Node.js', 'Express.js', 'EJS', 'Nodemon', 'NPM'],
    nodeVersion:    process.version,
    platform:       process.platform,
    uptime:         Math.floor(process.uptime()) + 's',
    expressVersion: require('./node_modules/express/package.json').version
  });
});

// 404 HANDLER – must be last
app.use((req, res) => {
  res.status(404).render('404', { title: '404 – Not Found', url: req.url });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// ─── 5. START SERVER ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log(`║  Exp 12 – Express server running          ║`);
  console.log(`║  URL: http://localhost:${PORT}              ║`);
  console.log(`║  Node: ${process.version}                        ║`);
  console.log('╚══════════════════════════════════════════╝');
});

module.exports = app;
