const express = require('express');
const path = require('path');
const app = express();
const PORT = 3005;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static CSS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Student data
const students = [
  { id: 1, name: 'Satyam Koranga', branch: 'CSE', marks: 95, grade: 'A+' },
  { id: 2, name: 'Priya Sharma',   branch: 'ECE', marks: 88, grade: 'A'  },
  { id: 3, name: 'Rahul Gupta',    branch: 'CSE', marks: 72, grade: 'B'  },
  { id: 4, name: 'Neha Singh',     branch: 'IT',  marks: 65, grade: 'C'  },
  { id: 5, name: 'Aditya Verma',   branch: 'MECH',marks: 91, grade: 'A+' },
];

// Routes
app.get('/', (req, res) => res.render('index', { title: 'Exp05 – EJS Templating' }));

app.get('/students', (req, res) => {
  res.render('students', { title: 'Student List', students });
});

app.get('/student/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).render('404', { title: '404 Not Found' });
  res.render('student-detail', { title: student.name, student });
});

app.get('/form', (req, res) => res.render('form', { title: 'Add Student', message: null }));

app.post('/form', (req, res) => {
  const { name, branch, marks } = req.body;
  const grade = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : 'C';
  students.push({ id: students.length + 1, name, branch, marks: parseInt(marks), grade });
  res.render('form', { title: 'Add Student', message: `Student "${name}" added successfully!` });
});

app.use((req, res) => res.status(404).render('404', { title: '404 Not Found' }));

app.listen(PORT, () => console.log(`Exp05-Templating running at http://localhost:${PORT}`));
