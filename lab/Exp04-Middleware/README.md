# Exp 04 – Express Middleware

## Summary
Demonstrates the full Express middleware pipeline: **custom logger**, **body parser**, **static file serving**, **route-level auth guard**, **404 handler**, and **central error handler**.

## Concepts Covered
| Middleware Type | Purpose |
|---|---|
| Logger | Logs method + URL + timestamp for every request |
| `express.json()` | Parses JSON request bodies |
| `express.urlencoded()` | Parses HTML form POST bodies |
| `express.static()` | Serves files from `public/` folder |
| Auth Guard | Checks `x-auth-token` header before protected routes |
| 404 Handler | Catches unmatched routes |
| Error Handler | 4-param `(err,req,res,next)` catches all thrown errors |

## Files
- [`app.js`](app.js) – All middleware + routes in one file
- [`package.json`](package.json) – Dependencies

## How to Run
```bash
cd Exp04-Middleware
npm install
npm run dev
```
Server starts on **http://localhost:3004**

## Test the Routes
```bash
# Public route (no token needed)
curl http://localhost:3004/public-data

# Protected route – without token (401)
curl http://localhost:3004/private-data

# Protected route – with token (200)
curl -H "x-auth-token: secret123" http://localhost:3004/private-data

# POST echo
curl -X POST http://localhost:3004/echo -H "Content-Type: application/json" -d "{\"name\":\"Satyam\"}"
```
