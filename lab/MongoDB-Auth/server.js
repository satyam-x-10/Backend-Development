// ============================================================
// Experiment 13A – MongoDB, Mongoose & Express
//                  User Registration & Login System
// Satyam Koranga | Backend Development Lab | UPES 2026
// ============================================================
// Prerequisites:
//   • MongoDB running locally: mongod
//   • npm install
//   • npm run dev
//
// MongoDB: mongodb://localhost:27017/userdb
// Server : http://localhost:4000
// ============================================================

const express        = require('express');
const mongoose       = require('mongoose');
const bcrypt         = require('bcryptjs');
const session        = require('express-session');

const app  = express();
const PORT = 4000;

// ─── MIDDLEWARE ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:            'exp13a-secret-key-upes-2026',
  resave:            false,
  saveUninitialized: false,
  cookie:            { maxAge: 1000 * 60 * 30 } // 30 min
}));

// ─── CSS (inline for simplicity – no external file needed) ────
const CSS = `
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif; background:#f0f4f8; color:#333; }
    nav  { background:#2c3e50; padding:14px 24px; display:flex; gap:20px; align-items:center; }
    nav a, nav strong { color:white; text-decoration:none; font-weight:600; }
    nav a:hover { color:#3498db; }
    .container { max-width:800px; margin:32px auto; padding:0 24px; }
    .card { background:white; border-radius:10px; padding:28px; margin-bottom:24px; box-shadow:0 2px 10px rgba(0,0,0,.08); }
    h1 { font-size:2rem; color:#2c3e50; margin-bottom:8px; }
    h2 { font-size:1.4rem; color:#2c3e50; border-bottom:2px solid #3498db; padding-bottom:6px; margin-bottom:16px; }
    p  { color:#555; margin-bottom:10px; line-height:1.65; }
    label { font-weight:600; display:block; margin-bottom:4px; margin-top:12px; }
    input[type=text], input[type=email], input[type=password] {
      width:100%; padding:10px 14px; border:2px solid #ddd; border-radius:6px;
      font-size:1rem; transition:border-color 0.2s;
    }
    input:focus { outline:none; border-color:#3498db; }
    .btn { padding:11px 28px; background:#3498db; color:white; border:none; border-radius:6px;
           cursor:pointer; font-size:1rem; margin-top:16px; transition:background 0.2s; }
    .btn:hover { background:#2980b9; }
    .btn.red { background:#e74c3c; }
    .btn.red:hover { background:#c0392b; }
    .btn.green { background:#27ae60; }
    .alert { padding:12px 16px; border-radius:6px; margin-bottom:16px; }
    .alert-success { background:#d4edda; border:1px solid #c3e6cb; color:#155724; }
    .alert-error   { background:#f8d7da; border:1px solid #f5c6cb; color:#721c24; }
    .alert-info    { background:#cce5ff; border:1px solid #b8daff; color:#004085; }
    table { border-collapse:collapse; width:100%; margin-top:16px; }
    th,td { border:1px solid #ddd; padding:10px 12px; text-align:left; }
    th { background:#3498db; color:white; }
    tr:nth-child(even) { background:#f8f9fa; }
    .badge { display:inline-block; background:#3498db; color:white; padding:2px 10px; border-radius:12px; font-size:0.8rem; }
    .badge.green { background:#27ae60; }
    code { background:#ecf0f1; padding:2px 6px; border-radius:3px; font-family:monospace; }
    pre  { background:#2c3e50; color:#ecf0f1; padding:16px; border-radius:6px; overflow-x:auto; font-family:monospace; margin:12px 0; }
    footer { background:#2c3e50; color:white; text-align:center; padding:20px; margin-top:40px; font-size:0.9rem; }
  </style>
`;

// ─── NAVBAR helper ────────────────────────────────────────────
const navbar = (req) => `
  <nav>
    <strong>🍃 Exp 13A – MongoDB Auth</strong>
    <a href="/">Home</a>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <a href="/users">All Users</a>
    ${req.session.user ? `<a href="/dashboard">Dashboard</a> <a href="/logout">Logout (${req.session.user.username})</a>` : ''}
  </nav>
`;

// ─── CONNECT TO MONGODB ───────────────────────────────────────
const DB_URL = 'mongodb://localhost:27017/userdb';

mongoose.connect(DB_URL)
  .then(() => console.log('✅ Connected to MongoDB: ' + DB_URL))
  .catch(err  => console.error('❌ MongoDB connection error:', err.message));

mongoose.connection.on('error', err => console.error('MongoDB error:', err));

// ─── USER SCHEMA & MODEL ──────────────────────────────────────
const userSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email:     { type: String, required: true, unique: true, trim: true, lowercase: true },
  password:  { type: String, required: true, minlength: 6 },
  createdAt: { type: Date,   default: Date.now }
});

// Instance method: compare plain password with hash
userSchema.methods.comparePassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login?msg=Please+login+first');
  }
  next();
};

// ─── ROUTES ───────────────────────────────────────────────────

// HOME
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Exp 13A</title>${CSS}</head><body>
    ${navbar(req)}
    <div class="container">
      <div class="card">
        <h1>🍃 Experiment 13A</h1>
        <h2>MongoDB + Mongoose + Express User Auth</h2>
        <p>This app demonstrates a complete <strong>User Registration & Login System</strong> using:</p>
        <ul style="margin:12px 0 12px 24px;line-height:2;">
          <li><strong>Express.js</strong> – Web framework & routing</li>
          <li><strong>Mongoose</strong> – MongoDB ODM (Schema, Model, Validation)</li>
          <li><strong>bcryptjs</strong> – Password hashing (never store plain passwords!)</li>
          <li><strong>express-session</strong> – Session management for login state</li>
          <li><strong>MongoDB</strong> – NoSQL Document database at <code>${DB_URL}</code></li>
        </ul>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">
          <a href="/register" class="btn" style="display:inline-block;">📝 Register</a>
          <a href="/login"    class="btn green" style="display:inline-block;">🔑 Login</a>
          <a href="/users"    class="btn" style="display:inline-block;background:#9b59b6;">👥 All Users</a>
        </div>
      </div>
      <div class="card">
        <h2>📋 Available Endpoints</h2>
        <table>
          <thead><tr><th>Method</th><th>Route</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><span class="badge green">GET</span></td><td><code>/</code></td><td>Home page</td></tr>
            <tr><td><span class="badge green">GET</span></td><td><code>/register</code></td><td>Registration form</td></tr>
            <tr><td><span class="badge">POST</span></td><td><code>/register</code></td><td>Create new user (bcrypt hash)</td></tr>
            <tr><td><span class="badge green">GET</span></td><td><code>/login</code></td><td>Login form</td></tr>
            <tr><td><span class="badge">POST</span></td><td><code>/login</code></td><td>Verify credentials, set session</td></tr>
            <tr><td><span class="badge green">GET</span></td><td><code>/dashboard</code></td><td>Protected – requires login</td></tr>
            <tr><td><span class="badge green">GET</span></td><td><code>/logout</code></td><td>Destroy session</td></tr>
            <tr><td><span class="badge green">GET</span></td><td><code>/users</code></td><td>List all users (no passwords)</td></tr>
            <tr><td><span class="badge red">DELETE</span></td><td><code>/users/:id</code></td><td>Delete user by ID</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer>&copy; 2026 Satyam Koranga – Exp 13A: MongoDB Auth | Backend Dev Lab</footer>
  </body></html>`);
});

// REGISTER – GET
app.get('/register', (req, res) => {
  const msg = req.query.msg || '';
  res.send(`<!DOCTYPE html><html><head><title>Register</title>${CSS}</head><body>
    ${navbar(req)}
    <div class="container">
      <div class="card">
        <h2>📝 User Registration</h2>
        ${msg ? `<div class="alert alert-error">❌ ${msg}</div>` : ''}
        <form action="/register" method="POST">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Min 3 characters" required>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Min 6 characters" required>
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat password" required>
          <button type="submit" class="btn">Create Account</button>
        </form>
        <p style="margin-top:16px;">Already have an account? <a href="/login">Login here</a></p>
      </div>
      <div class="card">
        <h2>🔐 Password Hashing</h2>
        <pre>// bcryptjs: hash password before saving
const saltRounds = 10;
const hash = await bcrypt.hash(plainPassword, saltRounds);
// Store hash — never the plain password!

// Compare on login:
const match = await bcrypt.compare(plain, hash);</pre>
      </div>
    </div>
    <footer>&copy; 2026 Satyam Koranga – Exp 13A</footer>
  </body></html>`);
});

// REGISTER – POST
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.redirect('/register?msg=All+fields+are+required');
    }
    if (password !== confirmPassword) {
      return res.redirect('/register?msg=Passwords+do+not+match');
    }
    if (password.length < 6) {
      return res.redirect('/register?msg=Password+must+be+at+least+6+characters');
    }

    // Check duplicate
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.redirect('/register?msg=Username+or+email+already+taken');
    }

    // Hash password
    const saltRounds   = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Save user
    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();

    console.log(`✅ New user registered: ${username} (${email})`);
    res.redirect('/login?msg=Registration+successful!+Please+login.');

  } catch (err) {
    console.error('Register error:', err.message);
    res.redirect(`/register?msg=${encodeURIComponent(err.message)}`);
  }
});

// LOGIN – GET
app.get('/login', (req, res) => {
  const msg     = req.query.msg || '';
  const isError = !msg.toLowerCase().includes('success');
  res.send(`<!DOCTYPE html><html><head><title>Login</title>${CSS}</head><body>
    ${navbar(req)}
    <div class="container">
      <div class="card">
        <h2>🔑 User Login</h2>
        ${msg ? `<div class="alert ${isError ? 'alert-error' : 'alert-success'}">${isError ? '❌' : '✅'} ${msg}</div>` : ''}
        <form action="/login" method="POST">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Your password" required>
          <button type="submit" class="btn green">Login</button>
        </form>
        <p style="margin-top:16px;">No account? <a href="/register">Register here</a></p>
      </div>
    </div>
    <footer>&copy; 2026 Satyam Koranga – Exp 13A</footer>
  </body></html>`);
});

// LOGIN – POST
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.redirect('/login?msg=Both+fields+are+required');

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.redirect('/login?msg=Invalid+email+or+password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.redirect('/login?msg=Invalid+email+or+password');

    // Set session
    req.session.user = { id: user._id, username: user.username, email: user.email };
    console.log(`✅ User logged in: ${user.username}`);
    res.redirect('/dashboard');

  } catch (err) {
    console.error('Login error:', err.message);
    res.redirect('/login?msg=Server+error.+Try+again.');
  }
});

// DASHBOARD – protected
app.get('/dashboard', requireAuth, (req, res) => {
  const u = req.session.user;
  res.send(`<!DOCTYPE html><html><head><title>Dashboard</title>${CSS}</head><body>
    ${navbar(req)}
    <div class="container">
      <div class="card">
        <h2>🏠 Dashboard</h2>
        <div class="alert alert-success">✅ Welcome, <strong>${u.username}</strong>! You are logged in.</div>
        <table>
          <thead><tr><th>Field</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>User ID</td><td><code>${u.id}</code></td></tr>
            <tr><td>Username</td><td><strong>${u.username}</strong></td></tr>
            <tr><td>Email</td><td>${u.email}</td></tr>
            <tr><td>Session Active</td><td><span class="badge green">Yes</span></td></tr>
          </tbody>
        </table>
        <a href="/logout" class="btn red" style="display:inline-block;margin-top:16px;">🚪 Logout</a>
      </div>
    </div>
    <footer>&copy; 2026 Satyam Koranga – Exp 13A</footer>
  </body></html>`);
});

// LOGOUT
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login?msg=Logged+out+successfully.'));
});

// ALL USERS – list (passwords hidden)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    const rows  = users.map(u => `
      <tr>
        <td><code>${u._id}</code></td>
        <td><strong>${u.username}</strong></td>
        <td>${u.email}</td>
        <td>${new Date(u.createdAt).toLocaleString()}</td>
        <td>
          <form action="/users/${u._id}?_method=DELETE" method="POST" style="display:inline;"
                onsubmit="return confirm('Delete ${u.username}?')">
            <button type="submit" class="btn red" style="padding:4px 12px;font-size:0.85rem;">Delete</button>
          </form>
        </td>
      </tr>
    `).join('');

    res.send(`<!DOCTYPE html><html><head><title>All Users</title>${CSS}</head><body>
      ${navbar(req)}
      <div class="container">
        <div class="card">
          <h2>👥 All Users (passwords hidden)</h2>
          <p>Query: <code>User.find({}, '-password')</code> — excludes the password field.</p>
          <p>Total: <strong>${users.length}</strong> user(s)</p>
          <table>
            <thead><tr><th>MongoDB _id</th><th>Username</th><th>Email</th><th>Created</th><th>Action</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="5" style="text-align:center;">No users yet. <a href="/register">Register one!</a></td></tr>'}</tbody>
          </table>
        </div>
      </div>
      <footer>&copy; 2026 Satyam Koranga – Exp 13A</footer>
    </body></html>`);

  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// DELETE USER
app.post('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err.message);
  }
});

// 404
app.use((req, res) => {
  res.status(404).send(`<h2>404 – Not Found</h2><a href="/">← Home</a>`);
});

// START
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log(`║  Exp 13A – MongoDB Auth Server Running        ║`);
  console.log(`║  URL:     http://localhost:${PORT}              ║`);
  console.log(`║  MongoDB: ${DB_URL}  ║`);
  console.log('╚══════════════════════════════════════════════╝');
});

module.exports = app;
