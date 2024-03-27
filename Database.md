```sql
-- CourseInfo
CREATE TABLE CourseInfo(
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR NOT NULL
);

-- BranchInfo
CREATE TABLE BranchInfo(
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR NOT NULL
);

-- SemesterInfo
CREATE TABLE SemesterInfo(
    semester_id SERIAL PRIMARY KEY,
    semester_name VARCHAR NOT NULL
);

-- StudentInfo
CREATE TABLE StudentInfo(
    student_id SERIAL PRIMARY KEY,
    student_full_name VARCHAR NOT NULL,
    student_email VARCHAR NOT NULL,
    student_password VARCHAR NOT NULL,
    student_gender VARCHAR NOT NULL,
    course_id INT NOT NULL,
    branch_id INT NOT NULL,
    semester_id INT NOT NULL,
    student_university_id VARCHAR NOT NULL,
    student_phone_number VARCHAR(10) NOT NULL,
    student_dob DATE NOT NULL,
    student_profile_src VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (course_id) REFERENCES CourseInfo(course_id),
    FOREIGN KEY (branch_id) REFERENCES BranchInfo(branch_id),
    FOREIGN KEY (semester_id) REFERENCES SemesterInfo(semester_id)
);

-- SkillsInfo
CREATE TABLE SkillsInfo(
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR NOT NULL UNIQUE
);

-- StudentSkillsInfo
CREATE TABLE StudentSkillsInfo(
    student_skill_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    created_at TIMESTAMP NOW(),
    UNIQUE(student_id, skill_id),
    FOREIGN KEY (student_id) REFERENCES studentInfo(student_id)
);

CREATE TABLE FacultyInfo(
    faculty_id SERIAL PRIMARY KEY,
    faculty_full_name VARCHAR NOT NULL,
    faculty_email VARCHAR NOT NULL,
    faculty_password VARCHAR NOT NULL,
    course_id INT NOT NULL,
    branch_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES CourseInfo(course_id),
    FOREIGN KEY (branch_id) REFERENCES BranchInfo(branch_id)
);

-- TutorInfo
CREATE TABLE TutorInfo(
    tutor_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    tutor_title VARCHAR NOT NULL,
    skill_description TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT 'false',
    faculty_id INT NOT NULL,
    tutor_rating NUMERIC(2,1),
    is_rejected BOOLEAN DEFAULT 'false',
    rejection_reason VARCHAR,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (student_id) REFERENCES studentInfo(student_id),
    FOREIGN KEY (faculty_id) REFERENCES FacultyInfo(faculty_id)
);

-- -----------------------------------
-- INSERT Statements
-- -----------------------------------
INSERT INTO CourseInfo(course_name) VALUES('B.Tech'),
('Polytechnic')

INSERT INTO BranchInfo(branch_name) VALUES('Civil Engineering'),
('Computer Science & Engineering'),
('Electrical Engineering'),
('Electronics & Telecommunication Engineering'),
('Food Engineering'),
('Mechanical Engineering'),
('Mining Engineering')

INSERT INTO SemesterInfo(semester_name) VALUES('First'),
('Second'),
('Third'),
('Fourth'),
('Fifth'),
('Sixth'),
('Seventh'),
('Eighth')


INSERT INTO SkillsInfo (skill_name) VALUES
('C Programming'),
('Java Programming'),
('Web Development'),
('Database Management'),
('Machine Learning'),
('Network Administration'),
('Information Security'),
('Technical Writing'),
('Cloud Computing'),
('Mobile App Development'),
('Software Engineering'),
('Data Science'),
('UI/UX Design'),
('Robotics'),
('Embedded Systems'),
('Artificial Intelligence'),
('Database Design'),
('Computer Graphics'),
('Computer Vision'),
('Backend Development'),
('Python'),
('JavaScript'),
('HTML'),
('CSS'),
('PHP'),
('Ruby'),
('Swift'),
('Objective-C'),
('C++'),
('C#'),
('ASP.NET'),
('Node.js'),
('React'),
('Angular'),
('Vue.js'),
('Express.js'),
('Django'),
('Flask'),
('Spring Framework'),
('Hibernate'),
('TensorFlow'),
('PyTorch'),
('Keras'),
('Scikit-learn'),
('Pandas'),
('NumPy'),
('Matplotlib'),
('Jupyter Notebook'),
('MySQL'),
('PostgreSQL'),
('MongoDB'),
('SQLite'),
('Microsoft SQL Server'),
('Oracle Database'),
('Firebase'),
('AWS'),
('Microsoft Azure'),
('Google Cloud Platform'),
('Docker'),
('Kubernetes'),
('Jenkins'),
('Git'),
('GitHub'),
('Bitbucket'),
('RESTful API'),
('JSON'),
('XML');

```