

**Student:** Satyam Koranga  
**GitHub:** [@satyam-x-10](https://github.com/satyam-x-10)  
**Reference:** [Course Lab Page](https://upessocs.github.io/#dir=/Lectures/Backend%20Development/Lab/&file=list.txt)

---


 Exp 01 – All HTML5 Elements

**Course Outcome:** CO2 – Create and build web pages and applications  
**Short Summary:** Demonstrates the complete structure and semantic foundation of HTML5. Includes semantic layout containers (`header`, `nav`, `main`, `article`, `aside`, `footer`), 20+ form inputs with validation, native multimedia players (`audio`, `video`), HTML5 2D Canvas drawing, inline SVG, styled tables, and interactive UI tags (`details`, `dialog`, `template`).
 


### Key Features
- **Semantic Structure:** Clear separation of content for SEO & screen reader accessibility.
- **HTML5 Forms:** `color`, `date`, `range`, `datetime-local`, `datalist`, `progress`, `meter`.
- **Media & Graphics:** Native `<audio>`, `<video>`, `<canvas>` 2D graphics API, `<svg>`.
- **Interactive:** Native modal `<dialog>`, expandable `<details>`, and cloned `<template>`.

---

## Exp 02 – Cascading Style Sheets

**Course Outcome:** CO2 – Create and build web pages and applications  
**Short Summary:** Explores all three types of CSS (Inline, Internal, and External) and their cascading priority order (`Inline > ID > Class > Element`). Covers CSS Box Model layout, Flexbox 1D flow, CSS Grid 2D layout, selector specificity, `@keyframes` animations, hover transitions, and CSS Custom Properties (`:root` variables) with a live Dark Theme toggle.



###  Files
- [`Exp02-CSS/index.html`](Exp02-CSS/index.html) (Demonstrates Inline & Internal CSS)
- [`Exp02-CSS/styles.css`](Exp02-CSS/styles.css) (External Stylesheet)

### Key Features
- **Cascading Hierarchy:** Proves priority resolution between Inline (1000), ID (100), Class (10), and Element (1).
- **Box Model:** Visualized content, padding, border, and margin dimensions.
- **Modern Layouts:** Flexbox item wrapping and multi-column CSS Grid spanning.
- **Animations:** `@keyframes` color shift, pulse, and continuous spin animations.
- **Theming:** Dynamic theme swapping via CSS variables (`--primary`, `--dark`, etc.).

---

 Exp 03 – Responsive Web Page

**Course Outcome:** CO2 – Create and build web pages and applications  
**Short Summary:** A multi-device responsive web page built from scratch using pure HTML5 and CSS3 with zero external frameworks. Implements mobile-first and desktop-first media queries (`≤480px`, `≤768px`, `≤1024px`), dynamic hamburger navigation toggle, fluid typography (`clamp()`), and responsive Flexbox and Grid component cards.


###  Files
- [`Exp03-Responsive/index.html`](Exp03-Responsive/index.html)

### Key Features
- **Viewport Control:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- **Fluid Layout:** Adapts seamlessly between 1440px desktop, 768px tablet, and 375px mobile phone.
- **Interactive Hamburger Nav:** Pure CSS & lightweight JS toggle for mobile view.
- **CSS Grid Auto-Fit:** `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for cards.

---

## Exp 12 – Node.js, NPM, Express, Nodemon & EJS

**Course Outcome:** CO3 – Develop and implement backend systems  
**Short Summary:** Implements a full server-side JavaScript web application with Express.js. Demonstrates diverse HTTP response types (`res.send`, `res.json`, `res.status`), URL route parameters (`/user/:id`), query strings (`/search`, `/calculate`), POST form processing with `urlencoded` middleware, and dynamic server-side template rendering using EJS (`views/*.ejs`).

###  Files
- [`Exp12-NodeJS-Express-EJS/app.js`](Exp12-NodeJS-Express-EJS/app.js)
- [`Exp12-NodeJS-Express-EJS/package.json`](Exp12-NodeJS-Express-EJS/package.json)
- [`Exp12-NodeJS-Express-EJS/public/style.css`](Exp12-NodeJS-Express-EJS/public/style.css)
- [`Exp12-NodeJS-Express-EJS/views/`](Exp12-NodeJS-Express-EJS/views/) (`index.ejs`, `user.ejs`, `form.ejs`, `students.ejs`, `about.ejs`, `404.ejs`)

### ⚙️ How to Run
```bash
cd Exp12-NodeJS-Express-EJS
npm install
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## Exp 13A – MongoDB, Mongoose & Express Auth

**Course Outcome:** CO3 – Develop and implement backend systems  
**Short Summary:** Builds a secure User Registration and Login Authentication System using Express.js and MongoDB (via Mongoose ODM). Implements industry-standard **bcrypt password hashing** (10 salt rounds), session-based authentication with `express-session`, protected dashboard routing, user deletion, and safe user data projection (excluding hashed passwords).


### Files
- [`Exp13A-MongoDB-Auth/server.js`](Exp13A-MongoDB-Auth/server.js)
- [`Exp13A-MongoDB-Auth/package.json`](Exp13A-MongoDB-Auth/package.json)

###  How to Run
```bash
# Ensure local MongoDB server is running (mongod)
cd Exp13A-MongoDB-Auth
npm install
npm run dev
```
Open **http://localhost:4000** in your browser.

---

## 🐘 Exp 14 – PostgreSQL (Optional)

**Course Outcome:** CO3 – Develop and implement backend systems  
**Short Summary:** Demonstrates relational database fundamentals with PostgreSQL. Creates a structured `students` table with primary key constraints, data validation, and default timestamps. Executes comprehensive SQL CRUD operations, filtering (`WHERE branch='CSE'`), aggregations (`GROUP BY branch`, `AVG()`, `COUNT()`), conditional evaluation (`CASE` grading), indexing, and includes a detailed architectural comparison between PostgreSQL (Relational) and MongoDB (Document).

###  Output Terminal Results

```sql
-- 1. All Students Query
SELECT * FROM students ORDER BY id;

 id |      name       | branch |        email        | enrollment_date | marks | active 
----+-----------------+--------+---------------------+-----------------+-------+--------
  1 | Satyam Koranga  | CSE    | satyam@upes.ac.in   | 2023-08-01      | 95.00 | t
  2 | Priya Sharma    | ECE    | priya@upes.ac.in    | 2023-08-01      | 88.50 | t
  3 | Rahul Gupta     | CSE    | rahul@upes.ac.in    | 2024-01-15      | 92.00 | t
  4 | Neha Singh      | IT     | neha@upes.ac.in     | 2024-01-15      | 85.75 | t
  5 | Aditya Verma    | MECH   | aditya@upes.ac.in   | 2024-06-01      | 79.00 | t
  6 | Riya Patel      | CSE    | riya@upes.ac.in     | 2024-06-01      | 91.50 | t

-- 2. Aggregations (GROUP BY branch)
SELECT branch, COUNT(*) AS total_students, ROUND(AVG(marks),2) AS avg_marks FROM students GROUP BY branch;

 branch | total_students | avg_marks 
--------+----------------+-----------
 CSE    |              3 |     92.83
 ECE    |              1 |     88.50
 IT     |              1 |     85.75
 MECH   |              1 |     79.00
```

### Files
- [`Exp14-PostgreSQL/exp14_postgresql.sql`](Exp14-PostgreSQL/exp14_postgresql.sql)

### PostgreSQL vs MongoDB Comparison

| Aspect | PostgreSQL (Relational) | MongoDB (Document) |
|--------|------------------------|--------------------|
| **Data Format** | Tables, Rows, Columns | Collections, JSON/BSON Documents |
| **Schema** | Strictly typed and enforced | Dynamic, schema-less |
| **Query Syntax** | Structured Query Language (SQL) | MongoDB Query Language (MQL) |
| **Joins** | Native SQL `JOIN` | `$lookup` aggregation pipeline |
| **Transactions** | Complete ACID compliance | Multi-document ACID (v4.0+) |
| **Best For** | Complex relations & structured records | Unstructured/flexible data, rapid scaling |

---

