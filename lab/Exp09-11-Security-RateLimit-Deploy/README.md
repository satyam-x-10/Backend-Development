# Exp 09, 10 & 11 – Environment Config, Security, Rate Limiting & Deployment (Combined)

> These three experiments are implemented together as one production-ready Express server.

## Summary

| Exp | Topic | Implementation |
|-----|-------|----------------|
| **09** | Environment & Security | `dotenv`, `helmet` (11 security headers), `cors` with allowlist |
| **10** | Rate Limiting | `express-rate-limit` – global (100/15min) + strict auth (5/15min) |
| **11** | Deployment | `Dockerfile`, `docker-compose.yml`, `/health` endpoint |

## Files
```
Exp09-11-Security-RateLimit-Deploy/
├── server.js           ← Main Express server (Exp09+10+11 combined)
├── package.json
├── .env.example        ← Copy to .env before running
├── Dockerfile          ← Docker image definition
└── docker-compose.yml  ← Spins up API + MongoDB containers
```

## How to Run (Local)
```bash
cd Exp09-11-Security-RateLimit-Deploy
cp .env.example .env
npm install
npm run dev
```
Server on **http://localhost:3009**

## How to Run (Docker)
```bash
# Build and start both API and MongoDB containers
docker compose up --build

# Stop containers
docker compose down
```

## Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Feature overview |
| GET | `/health` | Health check (uptime, env, timestamp) |
| GET | `/headers` | View applied security headers |
| POST | `/auth/login` | Rate-limited login (max 5 attempts / 15 min) |

## Expected Output

**GET /health:**
```json
{
  "status": "OK",
  "env": "development",
  "uptime": "42s",
  "timestamp": "2026-11-26T04:00:00.000Z"
}
```

**Too many requests (rate limit hit):**
```json
{ "error": "Too many requests – please wait 15 minutes and try again." }
```

**Security headers added by helmet (visible in browser DevTools → Network → Response Headers):**
```
Content-Security-Policy: ...
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
...
```
