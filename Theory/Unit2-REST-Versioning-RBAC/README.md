# Unit 2: RESTful API Versioning and Role-Based Access Control

This module implements REST API architecture and access control mechanisms from Unit 2 (Lectures L18 to L23), highlighting URI-based versioning (`/api/v1` vs `/api/v2`), response envelopes, and Role-Based Access Control (RBAC).

- [Open Live Interactive RBAC Tester](demo.html)
- [View Source Code on Webpage](demo.html#source)
- [Back to Theory Index](../)

---

## Versioning and Permission Matrix

| Endpoint | Method | Allowed Roles | Description |
|---|---|---|---|
| `/api/v1/users` | GET | student, faculty, admin | Returns minimal flat array payload |
| `/api/v2/users` | GET | student, faculty, admin | Returns enveloped response with metadata and filtering |
| `/api/v2/users` | POST | faculty, admin | Creates a new record returning HTTP 201 |
| `/api/v2/users/:id` | DELETE | admin | Deletes a record by ID; returns 403 for lower roles |

---

## Running Locally

```bash
cd Theory/Unit2-REST-Versioning-RBAC
npm install
node server.js
```

The server listens on port `4003`.
