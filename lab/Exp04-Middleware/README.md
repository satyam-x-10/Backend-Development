# Exp 04 – Express Middleware

## Summary
Demonstrates how request-processing pipelines function in Express.js. This experiment implements a request logger, built-in body parsers, static asset delivery, a custom header-based authentication guard, a 404 route handler, and a centralized error handling middleware.

## Middleware Reference
| Middleware Type | Implementation | Description |
|---|---|---|
| Logger | Custom function | Logs request method, URL, and timestamp |
| Body Parser | `express.json()` | Parses incoming JSON payloads |
| Form Parser | `express.urlencoded()` | Decodes URL-encoded HTML form bodies |
| Static Server | `express.static()` | Serves public client assets |
| Auth Guard | Route-level handler | Validates presence of `x-auth-token` header |
| Route Fallback | 404 Handler | Catches unmatched endpoints |
| Error Handler | 4-parameter function | Catches runtime errors passed via `next(err)` |

## Source Files
- [`app.js`](app.js): Application setup, middleware declarations, and routes
- [`package.json`](package.json): Dependencies and start scripts

## How to Run
```bash
cd Exp04-Middleware
npm install
node app.js
```
The server will start on **http://localhost:3004**.
## output preview :
<img width="1500" height="1020" alt="Screenshot 2026-11-27 215428" src="https://github.com/user-attachments/assets/756ef773-43db-4653-b3f8-d5603ab3c647" />

## Testing Endpoints
```bash
# Public endpoint (no token required)
curl http://localhost:3004/public-data

# Protected endpoint without token (returns 401 Unauthorized)
curl http://localhost:3004/private-data

# Protected endpoint with valid token (returns 200 OK)
curl -H "x-auth-token: secret123" http://localhost:3004/private-data

# POST endpoint with JSON body
curl -X POST http://localhost:3004/echo \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Satyam\"}"
```
