// Exp09 – Environment Variables & Security (dotenv + helmet + cors)
// Exp10 – Rate Limiting (express-rate-limit)
// Exp11 – Deployment-ready server with all best practices combined

require('dotenv').config();
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const rateLimit = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3009;

// ─── EXP 09: Environment Variables ───────────────────────────────────────────
console.log(`App running in [${process.env.NODE_ENV || 'development'}] mode`);
console.log(`DB connected to: ${process.env.DB_URI || 'mongodb://localhost:27017/lab'}`);

// ─── EXP 09: Security Middleware (helmet adds 11 HTTP security headers) ───────
app.use(helmet());

// ─── EXP 09: CORS Configuration ───────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS policy: Origin ${origin} is not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ─── EXP 10: Global Rate Limiter ─────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests – please wait 15 minutes and try again.' },
});
app.use(globalLimiter);

// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts – try again in 15 minutes.' },
});

// ─── EXP 11: Deployment Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    env: process.env.NODE_ENV || 'development',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Exp 09+10+11 – Security, Rate Limiting & Deployment',
    features: {
      exp09: ['dotenv config', 'helmet security headers', 'CORS policy'],
      exp10: ['Global rate limiter: 100 req/15min', 'Auth limiter: 5 req/15min'],
      exp11: ['Health check endpoint /health', 'Deployment-ready setup', 'Dockerfile included'],
    }
  });
});

// Simulated login endpoint (rate-limited strictly)
app.post('/auth/login', authLimiter, (req, res) => {
  const { username, password } = req.body;
  if (username === 'satyam' && password === 'password123') {
    return res.json({ message: 'Login successful', token: 'demo-token-xyz' });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// View current security headers
app.get('/headers', (req, res) => {
  res.json({ headers: res.getHeaders() });
});

// ─── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Exp09+10+11 server running at http://localhost:${PORT}`);
  console.log(`  GET  http://localhost:${PORT}/health  → health check`);
  console.log(`  GET  http://localhost:${PORT}/headers → security headers`);
  console.log(`  POST http://localhost:${PORT}/auth/login → rate-limited login`);
});
