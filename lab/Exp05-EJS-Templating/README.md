# Exp 05 – EJS Templating Engine

## Summary
Demonstrates **server-side rendering (SSR)** using EJS (Embedded JavaScript) with Express. Covers loops (`<% %>` tags), conditionals, form handling, and dynamic data injection into HTML templates.

## Concepts Covered
| Feature | Implementation |
|---|---|
| `<%= %>` | Output escaped variable value |
| `<% %>` | Execute JS logic (loops, conditions) |
| `res.render()` | Render EJS template with data |
| Form POST | Add student via HTML form → server |
| Dynamic routing | `/student/:id` renders per-student detail |

## Files
```
Exp05-EJS-Templating/
├── app.js              ← Express + EJS server
├── package.json
├── public/
│   └── style.css
└── views/
    ├── index.ejs       ← Home page
    ├── students.ejs    ← Loop over all students
    ├── student-detail.ejs ← Single student view
    ├── form.ejs        ← Add student form
    └── 404.ejs         ← Error page
```

## How to Run
```bash
cd Exp05-EJS-Templating
npm install
npm run dev
```
Open **http://localhost:3005**
