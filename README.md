# Backend Development – UPES 2026

**Author:** Satyam Koranga  
**SAP / Roll No:** 590017202  
**Course:** Backend Development | UPES, Dehradun  
**Live Portal:** [https://satyam-x-10.github.io/Backend-Development/](https://satyam-x-10.github.io/Backend-Development/)

---

## Repository Structure

This repository holds my laboratory experiments, theory unit implementations, assignments, and projects for the Backend Development course. Every directory and documentation link opens directly as a webpage.

### 1. [Laboratory Experiments (`lab/`)](lab/)

Practical implementations covering frontend structure, Express.js middleware, templating engines, REST APIs, database integrations, security hardening, and real-time WebSockets.

| Experiment | Title | Webpage | Core Focus |
|---|---|---|---|
| **Exp 01** | HTML5 Elements | [Open Webpage](lab/ExpHTML5/) | Semantic structure, forms, Canvas, SVG, native media |
| **Exp 02** | CSS Types and Selectors | [Open Webpage](lab/CSS/) | Cascading order, Flexbox, CSS Grid, keyframe animations |
| **Exp 03** | Responsive Web Design | [Open Webpage](lab/ExpResponsive/) | Media queries, clamp() typography, mobile-first layouts |
| **Exp 04** | Express Middleware | [View Docs](lab/Exp04-Middleware/) | Request logger, token auth guard, error handling pipeline |
| **Exp 05** | EJS Templating Engine | [View Docs](lab/Exp05-EJS-Templating/) | Server-side rendering, view layouts, dynamic routing |
| **Exp 07 & 08** | RESTful API and JWT Auth | [View Docs](lab/Exp07-REST-API-and-Auth/) | Complete CRUD API, bcrypt hashing, JSON Web Tokens |
| **Exp 09, 10 & 11** | Security, Rate Limiting and Deployment | [View Docs](lab/Exp09-11-Security-RateLimit-Deploy/) | Helmet headers, CORS policies, rate limiting, Docker |
| **Exp 12** | Node.js, Express and EJS | [Lab Section](lab/#exp-12--nodejs-express-and-ejs) | Route parameters, query strings, POST body parsing |
| **Exp 13A** | MongoDB Authentication | [Lab Section](lab/#exp-13a--mongodb-and-express-authentication) | Mongoose models, session-based auth, password hashing |
| **Exp 14** | PostgreSQL Relational Database | [Lab Section](lab/#exp-14--postgresql-relational-database) | Schema constraints, SQL CRUD, aggregations, indexing |
| **Exp 15** | Real-time Chat with Socket.IO | [View Docs](lab/Exp15-Realtime-Chat-SocketIO/) | WebSockets, event broadcasting, live client management |

Open the full [Laboratory Experiments Index](lab/) for setup steps and output captures.

---

### 2. [Theory Unit Codes and Assignments (`Theory/`)](Theory/)

Includes seven unit-wise backend implementations spanning Units 1 through 5 along with both course assignments:

- **Unit 1:** [HTTP, Cookies, Sessions and REST API](Theory/Unit1-Sessions-Cookies-API/demo.html) ([Docs](Theory/Unit1-Sessions-Cookies-API/))
- **Unit 2:** [SQL Schema, 3NF Normalization and Indexing](Theory/Unit2-SQL-Schema-Optimization/demo.html) ([Docs](Theory/Unit2-SQL-Schema-Optimization/))
- **Unit 2:** [REST API Versioning and RBAC](Theory/Unit2-REST-Versioning-RBAC/demo.html) ([Docs](Theory/Unit2-REST-Versioning-RBAC/))
- **Unit 3:** [Third-Party API Integration and TTL Caching](Theory/Unit3-Caching-ThirdParty-API/demo.html) ([Docs](Theory/Unit3-Caching-ThirdParty-API/))
- **Unit 4:** [Docker, CI/CD Pipeline and Health Monitoring](Theory/Unit4-Docker-CICD-Monitoring/demo.html) ([Docs](Theory/Unit4-Docker-CICD-Monitoring/))
- **Unit 5:** [Microservices Service Discovery and Async Events](Theory/Unit5-Microservices-Discovery/demo.html) ([Docs](Theory/Unit5-Microservices-Discovery/))
- **Unit 5:** [Serverless FaaS and Performance Profiling](Theory/Unit5-Serverless-Profiling/demo.html) ([Docs](Theory/Unit5-Serverless-Profiling/))
- **Assignment 1:** [Notes Application Report](Theory/590017202_assignment1.md) and [Live Notes App](Theory/assignment1_notes_app.html)
- **Assignment 2:** [PostgreSQL JSONB Report](Theory/590017202_assignment2.md) and [SQL Script Viewer](Theory/assignment2_viewer.html)

Open the [Theory Coursework Index](Theory/) for full details across all units.

---

### 3. [Content Management System (`lab/cms/`)](lab/cms/)

A server-side rendered blog management application built using Python, Flask, PyMongo, and Jinja2 templates connected to a local MongoDB instance.

- `GET /posts`: Lists stored blog posts with projected fields.
- `GET /posts/new` and `POST /posts`: Create post interface with validation and persistence.
- `GET /posts/<id>`: Detailed view querying documents via BSON ObjectId.

Open the [CMS Project Page](lab/cms/) for route tables, schema design, output captures, and setup steps.
### 4. PBL TASK 
     PBL Assignment - DockerAPI (Containerized FastAPI Service)

A containerized Student Management API built with FastAPI, tested automatically with pytest, and deployed through a GitHub Actions CI/CD pipeline to Docker Hub.

- **Repository:** [satyam-x-10/DockerAPI](https://github.com/satyam-x-10/DockerAPI)
- **Docker Hub Image:** [satyamm10/fastapi-app](https://hub.docker.com/r/satyamm10/fastapi-app)
- **Live Hosted URL:** [Student Management API](https://dockerapi-satyam.onrender.com/)

### What Was Implemented

- **FastAPI Application (`main.py`):** Stateless Student Management API with `/`, `/health`, and full CRUD routes under `/students`, plus structured request logging middleware.
- **Automated Route Testing (`automationTesting.py`):** Verifies all endpoints and error responses using FastAPI `TestClient` and `pytest`.
- **Containerization (`Dockerfile` & `docker-compose.yml`):** Packages the service on `python:3.12-slim` with a `/health` check and single-command local orchestration.
- **CI/CD Pipeline (`.github/workflows/ActionsYaml.yaml`):** Runs `automationTesting.py` on every push and pull request to `main`, then builds and pushes the Docker image to Docker Hub once tests pass.
