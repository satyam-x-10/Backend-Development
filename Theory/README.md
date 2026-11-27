# Backend Development Theory Coursework

**Student:** Satyam Koranga  
**SAP / Roll No:** 590017202  
**Institution:** UPES, Dehradun  
**Course Reference:** [UPES SoCS Theory Lectures](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory)  
**Navigation:** [Course Home](../) | [Lab Experiments](../lab/)

---

## Theory Unit Code Implementations (Units 1 to 5)

Seven practical code implementations spanning all five units of the Backend Development theory syllabus. Every module includes runnable source code, documentation, and an interactive webpage demonstration that opens directly in the browser.

| Unit | Module | Interactive Webpage | Documentation | Topics Covered |
|---|---|---|---|---|
| **Unit 1** | Sessions, Cookies and REST API | [Open Live Demo](Unit1-Sessions-Cookies-API/demo.html) | [Unit 1 Docs](Unit1-Sessions-Cookies-API/) | HTTP inspection, cookies, server-side sessions, REST endpoints |
| **Unit 2** | SQL Schema and Query Optimization | [Open Live Demo](Unit2-SQL-Schema-Optimization/demo.html) | [Unit 2 SQL Docs](Unit2-SQL-Schema-Optimization/) | 3NF normalization, foreign keys, JOIN queries, B-Tree indexes |
| **Unit 2** | REST API Versioning and RBAC | [Open Live Demo](Unit2-REST-Versioning-RBAC/demo.html) | [Unit 2 REST Docs](Unit2-REST-Versioning-RBAC/) | URI versioning (`/api/v1` vs `/api/v2`), role-based access control |
| **Unit 3** | Third-Party API and TTL Caching | [Open Live Demo](Unit3-Caching-ThirdParty-API/demo.html) | [Unit 3 Docs](Unit3-Caching-ThirdParty-API/) | Cache-Aside pattern, TTL expiration, X-Cache HIT/MISS headers |
| **Unit 4** | Docker, CI/CD and Health Monitoring | [Open Live Demo](Unit4-Docker-CICD-Monitoring/demo.html) | [Unit 4 Docs](Unit4-Docker-CICD-Monitoring/) | `/health` and `/metrics` probes, `node:test`, Dockerfile, CI YAML |
| **Unit 5** | Microservices Discovery and Messaging | [Open Live Demo](Unit5-Microservices-Discovery/demo.html) | [Unit 5 Discovery Docs](Unit5-Microservices-Discovery/) | Service registry, synchronous REST lookup, async event bus |
| **Unit 5** | Serverless FaaS and Profiling | [Open Live Demo](Unit5-Serverless-Profiling/demo.html) | [Unit 5 Serverless Docs](Unit5-Serverless-Profiling/) | Lambda cold vs warm starts, CPU profiling (`Array.find` vs `Map`) |

---

## Completed Assignments

### 1. [Assignment 1 — Notes Application (Web Storage and JSON)](590017202_assignment1.md)
A client-side notes application built with HTML5, CSS custom properties, and vanilla JavaScript. Notes are serialized with `JSON.stringify` and stored persistently in browser `localStorage`, supporting editing, deletion, search filtering, category tags, theme switching, and JSON backup import/export.

- [Written Report](590017202_assignment1.md)
- [Open Live Notes Application](assignment1_notes_app.html)

---

### 2. [Assignment 2 — PostgreSQL as SQL and NoSQL: Working with JSONB](590017202_assignment2.md)
An investigation and implementation of semi-structured document storage inside PostgreSQL using `jsonb`. Covers binary vs text JSON storage, GIN indexing, containment (`@>`) and path (`->`, `->>`, `?`) operators, dynamic updates, and a side-by-side comparison with MongoDB.

- [Written Report](590017202_assignment2.md)
- [View SQL Script on Webpage](assignment2_viewer.html)
