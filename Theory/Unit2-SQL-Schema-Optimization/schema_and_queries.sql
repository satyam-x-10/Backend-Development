-- Unit 2: Database Schema Design, Normalization (3NF), CRUD and Query Optimization
-- Covers Lectures L13, L14A, L14B, L15, L16, L17

DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- 1. Normalized 3NF Schema (eliminating transitive and partial dependencies)
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_code VARCHAR(10) UNIQUE NOT NULL,
    dept_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    dept_id INTEGER NOT NULL REFERENCES departments(dept_id) ON DELETE RESTRICT
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(15) UNIQUE NOT NULL,
    title VARCHAR(120) NOT NULL,
    credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6),
    dept_id INTEGER NOT NULL REFERENCES departments(dept_id)
);

CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    semester VARCHAR(20) NOT NULL,
    grade VARCHAR(2),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, course_id, semester)
);

-- 2. Seed Data
INSERT INTO departments (dept_code, dept_name) VALUES
('CSE', 'Computer Science and Engineering'),
('ECE', 'Electronics and Communication Engineering');

INSERT INTO students (roll_no, full_name, email, dept_id) VALUES
('590017202', 'Satyam Koranga', 'satyam@upes.ac.in', 1),
('590015937', 'Ayush Yadav', 'ayush@upes.ac.in', 1),
('590018104', 'Priya Sharma', 'priya@upes.ac.in', 2);

INSERT INTO courses (course_code, title, credits, dept_id) VALUES
('CS204', 'Backend Development', 4, 1),
('CS210', 'Database Management Systems', 4, 1),
('EC201', 'Digital Signal Processing', 3, 2);

INSERT INTO enrollments (student_id, course_id, semester, grade) VALUES
(1, 1, 'Fall-2026', 'A+'),
(1, 2, 'Fall-2026', 'A'),
(2, 1, 'Fall-2026', 'A'),
(3, 3, 'Fall-2026', 'A+');

-- 3. Multi-Table JOIN Read Query
SELECT
    s.roll_no,
    s.full_name,
    d.dept_code,
    c.course_code,
    c.title,
    e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN departments d ON s.dept_id = d.dept_id
JOIN courses c ON e.course_id = c.course_id
WHERE e.semester = 'Fall-2026'
ORDER BY s.roll_no;

-- 4. Update Operation
UPDATE enrollments
SET grade = 'A+'
WHERE student_id = 2 AND course_id = 1;

-- 5. Query Optimization with B-Tree Indexing
EXPLAIN ANALYZE
SELECT * FROM enrollments WHERE semester = 'Fall-2026';

CREATE INDEX idx_enrollments_semester ON enrollments(semester);
CREATE INDEX idx_students_dept ON students(dept_id);

EXPLAIN ANALYZE
SELECT * FROM enrollments WHERE semester = 'Fall-2026';
