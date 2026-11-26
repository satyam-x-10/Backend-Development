# Backend Development Theory Coursework

**Student:** Satyam Koranga ([@satyam-x-10](https://github.com/satyam-x-10))  
**SAP / Roll No:** 590017202  
**Institution:** UPES, Dehradun  
**Course Reference:** [UPES SoCS Theory Lectures](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory)

---

## Completed Assignments

### 1. [Assignment 1 — Notes Application (Web Storage and JSON)](590017202_assignment1.md)
- **Topic:** Unit 1 / L07 LocalStorage, SessionStorage and JSON — Final Task 12.
- **Description:** A client-side notes application built using semantic HTML5, CSS custom properties, and vanilla JavaScript. Data is serialized and stored in browser `localStorage` using `JSON.stringify` and `JSON.parse`.
- **Features:** Full record creation, editing, and deletion, keyword search filtering, category tags, dark and light theme switching, and JSON file backup export and import.
- **Files:**
  - Written Report: [`590017202_assignment1.md`](590017202_assignment1.md)
  - Application File: [`assignment1_notes_app.html`](assignment1_notes_app.html) (open directly in any browser)

---

### 2. [Assignment 2 — PostgreSQL as SQL and NoSQL: Working with JSONB](590017202_assignment2.md)
- **Topic:** Hybrid relational and document modeling using the PostgreSQL `jsonb` data type.
- **Description:** Detailed theoretical and practical investigation of storing semi-structured documents within an ACID-compliant relational database. Covers binary decomposition formats, GIN indexing mechanics, JSON path extraction operators, schema-less in-place updates, and architectural comparison against MongoDB.
- **Hands-on Implementation:**
  - Dynamic `products` table schema containing both relational SQL columns and an `attributes JSONB` column.
  - Multi-category product records (Books, Laptops, Accessories) with heterogeneous attribute structures.
  - Category-specific attribute filtering, containment checks (`@>`), scalar extraction (`->`, `->>`), and key existence queries (`?`).
  - Performance profiling using `EXPLAIN ANALYZE` before and after creating a GIN index.
  - Equivalent MongoDB shell queries and feature comparison matrix.
- **Files:**
  - Written Report: [`590017202_assignment2.md`](590017202_assignment2.md) / [`Assignment 2 PostgreSQL as SQL + NoSQL.md`](Assignment%202%20PostgreSQL%20as%20SQL%20+%20NoSQL.md)
  - Executable SQL Solution: [`assignment2_solution.sql`](assignment2_solution.sql)
