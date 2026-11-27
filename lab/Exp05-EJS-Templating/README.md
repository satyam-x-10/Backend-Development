# Exp 05 – EJS Templating Engine

## Summary
Demonstrates server-side rendering (SSR) using the Embedded JavaScript (EJS) templating engine with Express. The application passes backend data to views, iterates through records, renders conditional elements, processes form data, and serves static styles.

## Syntax Reference
| Tag Syntax | Behavior | Usage |
|---|---|---|
| `<%= value %>` | Escapes and prints output | Displaying strings safely without XSS risk |
| `<% code %>` | Executes JavaScript | Evaluating loops (`forEach`) and `if/else` checks |
| `<%- html %>` | Prints raw unescaped output | Rendering formatted HTML snippets |
| `res.render()` | Invokes view engine | Compiling templates with contextual data objects |

## Directory Structure
```
Exp05-EJS-Templating/
├── app.js              # Express routing and data definitions
├── package.json        # Dependencies and execution commands
├── public/
│   └── style.css       # Static CSS stylesheet
└── views/
    ├── index.ejs       # Home view
    ├── students.ejs    # Student table view with loop iteration
    ├── student-detail.ejs # Single record view
    ├── form.ejs        # Add student submission form
    └── 404.ejs         # Custom 404 error page
```

## How to Run
```bash
cd Exp05-EJS-Templating
npm install
npm run dev
```
Open **http://localhost:3005** in your browser.

## output preview
<img width="1586" height="1023" alt="Screenshot 2026-11-27 220916" src="https://github.com/user-attachments/assets/4190f2e5-8570-4b6b-818d-479605885095" />
<img width="1570" height="990" alt="Screenshot 2026-11-27 220939" src="https://github.com/user-attachments/assets/47fc54cd-360c-4ff8-a77f-5f068f18bae7" />
<img width="1550" height="950" alt="Screenshot 2026-11-27 221004" src="https://github.com/user-attachments/assets/9ab27d20-a20c-48ff-9149-9cef4d5db333" />



