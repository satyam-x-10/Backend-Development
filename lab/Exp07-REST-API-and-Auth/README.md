# Exp 07 & 08 – RESTful API + JWT Authentication (Combined)

> **Note:** These two experiments are implemented together in one Express server.

## Summary
- **Exp 07:** Builds a full RESTful CRUD API for a `Books` resource with filtering by query string.
- **Exp 08:** Adds JWT (JSON Web Token) based login and protected routes using Bearer token authentication.

## API Routes

### Auth (Exp 08)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/login` | Public | Login with username & password, receive JWT token |
| GET | `/auth/me` | 🔒 Protected | View logged-in user info from token |

### Books CRUD (Exp 07)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/books` | Public | List all books (supports `?genre=Tech&author=Martin`) |
| GET | `/api/books/:id` | Public | Get single book by ID |
| POST | `/api/books` | 🔒 Protected | Create new book |
| PUT | `/api/books/:id` | 🔒 Protected | Update existing book |
| DELETE | `/api/books/:id` | 🔒 Protected | Delete a book |

## Files
```
Exp07-REST-API-and-Auth/
├── server.js        ← Combined REST API + JWT Auth
├── package.json
└── .env.example     ← Copy to .env before running
```

## How to Run
```bash
cd Exp07-REST-API-and-Auth
cp .env.example .env
npm install
npm run dev
```
Server on **http://localhost:3007**

## Test with curl

```bash
# 1. Login and get token
curl -X POST http://localhost:3007/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"satyam\",\"password\":\"password123\"}"

# 2. Use the token for protected routes
curl -H "Authorization: Bearer <YOUR_TOKEN>" http://localhost:3007/auth/me

# 3. Get all books (public)
curl http://localhost:3007/api/books

# 4. Create a book (protected)
curl -X POST http://localhost:3007/api/books \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Node.js Design Patterns\",\"author\":\"Casciaro\",\"genre\":\"Tech\",\"year\":2020}"

# 5. Delete a book (protected)
curl -X DELETE http://localhost:3007/api/books/1 \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

## Expected Output

**Login response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGci...",
  "expiresIn": "1h"
}
```

**GET /api/books:**
```json
{
  "count": 3,
  "books": [
    { "id": 1, "title": "The Pragmatic Programmer", "author": "Hunt & Thomas", "genre": "Tech", "year": 1999 },
    { "id": 2, "title": "Clean Code", "author": "Robert Martin", "genre": "Tech", "year": 2008 },
    { "id": 3, "title": "You Don't Know JS", "author": "Kyle Simpson", "genre": "Tech", "year": 2015 }
  ]
}
```
