-- ============================================================
-- Experiment 14 – PostgreSQL: Relational Database Lab
-- Satyam Koranga | Backend Development Lab | UPES 2026
-- ============================================================
-- How to run:
--   1. Install PostgreSQL and start the service
--   2. sudo -u postgres psql
--   3. \i path/to/exp14_postgresql.sql
-- ============================================================

-- ─── 1. CREATE DATABASE ───────────────────────────────────────
-- Run this line separately in psql, then reconnect:
-- CREATE DATABASE student_management;
-- \c student_management

-- ─── 2. CREATE TABLE ─────────────────────────────────────────
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR(100)  NOT NULL,
    branch          VARCHAR(50)   NOT NULL,
    email           VARCHAR(255)  UNIQUE NOT NULL,
    enrollment_date DATE          DEFAULT CURRENT_DATE,
    marks           NUMERIC(5,2)  CHECK (marks BETWEEN 0 AND 100),
    active          BOOLEAN       DEFAULT TRUE
);

-- ─── 3. INSERT – CREATE ───────────────────────────────────────
INSERT INTO students (name, branch, email, enrollment_date, marks) VALUES
    ('Satyam Koranga', 'CSE',  'satyam@upes.ac.in',  '2023-08-01', 95.00),
    ('Priya Sharma',   'ECE',  'priya@upes.ac.in',   '2023-08-01', 88.50),
    ('Rahul Gupta',    'CSE',  'rahul@upes.ac.in',   '2024-01-15', 92.00),
    ('Neha Singh',     'IT',   'neha@upes.ac.in',    '2024-01-15', 85.75),
    ('Aditya Verma',   'MECH', 'aditya@upes.ac.in',  '2024-06-01', 79.00),
    ('Riya Patel',     'CSE',  'riya@upes.ac.in',    '2024-06-01', 91.50),
    ('Mohan Das',      'EEE',  'mohan@upes.ac.in',   '2023-08-01', 74.25);

-- ─── 4. READ – SELECT Queries ─────────────────────────────────

-- 4.1 All students
SELECT * FROM students ORDER BY id;

-- 4.2 Students in CSE branch only
SELECT id, name, email, marks
FROM students
WHERE branch = 'CSE'
ORDER BY marks DESC;

-- 4.3 Students enrolled AFTER Jan 1, 2024
SELECT name, branch, enrollment_date
FROM students
WHERE enrollment_date > '2024-01-01'
ORDER BY enrollment_date;

-- 4.4 Students with marks above average
SELECT name, branch, marks
FROM students
WHERE marks > (SELECT AVG(marks) FROM students)
ORDER BY marks DESC;

-- 4.5 Count students per branch
SELECT branch,
       COUNT(*)            AS total_students,
       ROUND(AVG(marks),2) AS avg_marks,
       MAX(marks)          AS top_marks
FROM students
GROUP BY branch
ORDER BY total_students DESC;

-- 4.6 Top 3 students overall
SELECT name, branch, marks
FROM students
ORDER BY marks DESC
LIMIT 3;

-- ─── 5. UPDATE ────────────────────────────────────────────────

-- 5.1 Change Neha's branch from IT to CSE
UPDATE students
SET branch = 'CSE'
WHERE email = 'neha@upes.ac.in';

-- 5.2 Give 5 bonus marks to all CSE students (max 100)
UPDATE students
SET marks = LEAST(marks + 5, 100)
WHERE branch = 'CSE';

-- Verify updates
SELECT name, branch, marks FROM students ORDER BY id;

-- ─── 6. DELETE ────────────────────────────────────────────────

-- 6.1 Soft delete: deactivate instead of remove (best practice)
UPDATE students
SET active = FALSE
WHERE email = 'mohan@upes.ac.in';

-- 6.2 Hard delete: remove record permanently
DELETE FROM students
WHERE email = 'mohan@upes.ac.in';

-- Verify after delete
SELECT * FROM students;

-- ─── 7. ADVANCED QUERIES ──────────────────────────────────────

-- 7.1 Grade classification using CASE
SELECT
    name,
    marks,
    CASE
        WHEN marks >= 90 THEN 'A+'
        WHEN marks >= 80 THEN 'A'
        WHEN marks >= 70 THEN 'B'
        WHEN marks >= 60 THEN 'C'
        ELSE 'F'
    END AS grade
FROM students
ORDER BY marks DESC;

-- 7.2 Pattern matching with ILIKE (case-insensitive)
SELECT name, email FROM students WHERE name ILIKE '%a%';

-- 7.3 Aggregation
SELECT
    COUNT(*)            AS total,
    ROUND(AVG(marks),2) AS average,
    MAX(marks)          AS highest,
    MIN(marks)          AS lowest,
    SUM(marks)          AS total_marks
FROM students;

-- ─── 8. CREATE INDEX ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_students_branch ON students(branch);
CREATE INDEX IF NOT EXISTS idx_students_email  ON students(email);

-- Check index usage
EXPLAIN ANALYZE SELECT * FROM students WHERE branch = 'CSE';

-- ─── 9. PSQL META-COMMANDS (run inside psql, no semicolon) ────
-- \l                      -- list databases
-- \c student_management   -- connect to database
-- \dt                     -- list tables
-- \d students             -- describe table
-- \du                     -- list users/roles
-- \q                      -- quit psql

-- ─── 10. BACKUP & RESTORE (run in terminal, not inside psql) ──
-- pg_dump student_management > backup.sql
-- psql student_management   < backup.sql
