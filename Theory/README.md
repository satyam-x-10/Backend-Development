# 📚 Backend Development Theory & Assignments

**Course:** Backend Development (Theory) | UPES, Dehradun  
**Student:** Satyam Koranga ([@satyam-x-10](https://github.com/satyam-x-10))  
**SAP / Roll No:** 590017202  
**Source Syllabus:** [UPES SoCS Theory Lectures](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory)

---

## 📑 Completed Assignments

### 1. [Assignment 1 — Notes App (Web Storage & JSON)](590017202_assignment1.md)
- **Topic:** Unit 1 / L07 LocalStorage, SessionStorage & JSON — Task 12 Final Task.
- **Description:** Complete client-side Notes / Todo application built using semantic HTML5, CSS custom properties, and vanilla JavaScript. Persists data permanently in `localStorage` with `JSON.stringify` and `JSON.parse`.
- **Key Features:** Full CRUD (Create, Read, Edit, Delete), categorical filtering, keyword search, dark/light theme switcher, JSON file import/export.
- **Files:**
  - 📄 Report: [`590017202_assignment1.md`](590017202_assignment1.md)
  - 🌐 Live App: [`assignment1_notes_app.html`](assignment1_notes_app.html) (double-click to run in any browser)

---

### 2. [Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB](590017202_assignment2.md)
- **Topic:** Hybrid Relational & Document modeling with PostgreSQL `jsonb`.
- **Description:** Comprehensive theoretical and practical analysis of storing semi-structured documents inside a relational engine. Covers storage differences (`json` vs `jsonb`), GIN inverted indexing, JSON path operators, schema-less updates, and an in-depth architectural comparison with MongoDB.
- **Key Hands-on Tasks:**
  - Dynamic `products` table schema combining fixed SQL columns + `attributes JSONB`.
  - Heterogeneous product insertions across 3 categories (Books, Laptops, Accessories).
  - Containment querying (`@>`), scalar extraction (`->`, `->>`), key checks (`?`).
  - GIN indexing and `EXPLAIN ANALYZE` execution plan benchmarking.
  - MongoDB `mongosh` equivalent queries and translation matrix.
- **Files:**
  - 📄 Report: [`590017202_assignment2.md`](590017202_assignment2.md) / [`Assignment 2 PostgreSQL as SQL + NoSQL.md`](Assignment%202%20PostgreSQL%20as%20SQL%20+%20NoSQL.md)
  - 🗄️ SQL Script: [`assignment2_solution.sql`](assignment2_solution.sql)
