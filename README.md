# Backend Development – UPES 2026

**Author:** Satyam Koranga ([@satyam-x-10](https://github.com/satyam-x-10))  
**SAP / Roll No:** 590017202  
**Course:** Backend Development | UPES, Dehradun

---

## Repository Structure

This repository contains my complete coursework, laboratory experiments, practical projects, and theoretical assignments for the Backend Development course.

### 1. [`lab/`](lab/) — Laboratory Experiments

Comprehensive implementation of all assigned laboratory exercises covering frontend fundamentals, Express.js web architecture, database integrations (MongoDB and PostgreSQL), security practices, and real-time networking.

| Experiment | Title | Core Focus |
|---|---|---|
| **Exp 01** | HTML5 Elements | Semantic structure, forms, Canvas, SVG, native media |
| **Exp 02** | CSS Types and Selectors | Cascading order, Flexbox, CSS Grid, keyframe animations |
| **Exp 03** | Responsive Web Design | Media queries, clamp() typography, mobile-first layouts |
| **Exp 04** | Express Middleware | Request logger, token auth guard, error handling pipeline |
| **Exp 05** | EJS Templating Engine | Server-side rendering, view layouts, dynamic routing |
| **Exp 07 & 08** | RESTful API and JWT Auth | Complete CRUD API, bcrypt hashing, JSON Web Tokens |
| **Exp 09, 10 & 11** | Security, Rate Limiting and Deployment | Helmet headers, CORS policies, rate limiting, Docker |
| **Exp 12** | Node.js, Express and EJS | Route parameters, query strings, POST body parsing |
| **Exp 13A** | MongoDB Authentication | Mongoose models, session-based auth, password hashing |
| **Exp 14** | PostgreSQL Relational Database | Schema constraints, SQL CRUD, aggregations, indexing |
| **Exp 15** | Real-time Chat with Socket.IO | WebSockets, event broadcasting, live client management |

Refer to [`lab/README.md`](lab/README.md) for detailed descriptions, source file listings, execution steps, and output captures.

---

### 2. [`Theory/`](Theory/) — Theoretical Assignments

Coursework assignments covering client-side storage architecture and advanced database modeling paradigms.

- **Assignment 1:** [Notes Application using Web Storage and JSON](Theory/590017202_assignment1.md)  
  A client-side notes management application built with vanilla JavaScript. It handles full record lifecycles, searching, tag classification, theme persistence, and JSON backup export/import via localStorage ([Open Application](Theory/assignment1_notes_app.html)).

- **Assignment 2:** [PostgreSQL as SQL and NoSQL: Working with JSONB](Theory/590017202_assignment2.md)  
  In-depth study and implementation of semi-structured document storage inside relational PostgreSQL. Covers binary storage differences, JSON path operators, GIN index acceleration, and architectural comparisons with MongoDB ([View SQL Solution](Theory/assignment2_solution.sql)).

Refer to [`Theory/README.md`](Theory/README.md) for full assignment details and theoretical write-ups.

---

### 3. [`lab/cms/`](lab/cms/) — Content Management System

A server-side rendered blog management application built using Python, Flask, PyMongo, and Jinja2 templates connected to a local MongoDB instance.

- `GET /posts`: Lists stored blog posts with projected fields.
- `GET /posts/new` and `POST /posts`: Create post interface with validation and persistence.
- `GET /posts/<id>`: Detailed view querying documents via BSON ObjectId.

Refer to [`lab/cms/README.md`](lab/cms/README.md) for route tables, schema design, and local setup instructions.
