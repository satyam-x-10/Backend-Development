# Unit 1: HTTP Inspection, Cookies, Sessions and REST API

This module implements core concepts from Unit 1 (Lectures L04, L05, and L06), demonstrating how stateless HTTP requests maintain state using client-side cookies and server-side session stores alongside structured REST endpoints.

- [Open Live Interactive Webpage Demo](demo.html)
- [View Source Code on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Implemented Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/inspect` | Returns parsed request method, query parameters, headers, and cookies |
| GET | `/cookie/set` | Sets an `HttpOnly` cookie using the `Set-Cookie` response header |
| GET | `/cookie/read` | Reads and returns cookies sent by the browser |
| GET | `/cookie/clear` | Expires the active cookie with `Max-Age=0` |
| POST | `/session/login` | Creates a server-side session entry in memory and issues a session ID cookie |
| GET | `/session/profile` | Validates the session ID cookie and increments the visit counter |
| POST | `/session/logout` | Removes the session record from the server store and clears the cookie |
| GET | `/api/tasks` | Lists stored task objects as JSON |
| POST | `/api/tasks` | Validates and creates a new task record returning status 201 |

---

## Running Locally

```bash
cd Theory/Unit1-Sessions-Cookies-API
npm install
node server.js
```

The Express server starts on port `4001`.
