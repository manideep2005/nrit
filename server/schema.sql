-- Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cgpa DECIMAL(3, 2),
    attendance_pct INTEGER CHECK (attendance_pct BETWEEN 0 AND 100),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    credits INTEGER NOT NULL,
    instructor VARCHAR(100)
);

-- Student Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
    course_id VARCHAR(20) REFERENCES courses(course_id) ON DELETE CASCADE,
    progress_pct INTEGER DEFAULT 0
);

-- Sample Data Insertion
-- Only inserts if the tables are empty
INSERT INTO students (name, email, cgpa, attendance_pct)
SELECT 'Mani Deep', 'mani@student.nrit.edu', 8.41, 89
WHERE NOT EXISTS (SELECT 1 FROM students WHERE email = 'mani@student.nrit.edu');

INSERT INTO courses (course_id, title, credits, instructor)
SELECT 'CS101', 'Data Structures & Algorithms', 4, 'Dr. Sarah Smith'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE course_id = 'CS101');

INSERT INTO courses (course_id, title, credits, instructor)
SELECT 'CS202', 'Database Management Systems', 3, 'Prof. Michael Chen'
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE course_id = 'CS202');

INSERT INTO enrollments (student_id, course_id, progress_pct)
SELECT 1, 'CS101', 85
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE student_id = 1 AND course_id = 'CS101');
