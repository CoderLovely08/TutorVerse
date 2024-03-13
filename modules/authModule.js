import pool from "../config/dbConfig.js";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export const registerFaculty = async (fullName, email, password, courseId, branchId) => {
    try {

        const checkUserAlreadyExistsQuery = {
            text: `SELECT faculty_id FROM FacultyInfo WHERE faculty_email = $1`,
            values: [email]
        }

        const userExists = await pool.query(checkUserAlreadyExistsQuery);
        if (userExists.rowCount > 0) return {
            success: false,
            message: "Faculty with same email already exists",
            data: []
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = {
            text: `INSERT INTO FacultyInfo(
                faculty_full_name,
                faculty_email,
                faculty_password,
                course_id,
                branch_id
                ) VALUES ($1, $2, $3, $4, $5)`,
            values: [fullName, email, hashedPassword, courseId, branchId]
        }

        const { rows, rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: "Faculty Registration Successful",
            data: rows
        }
    } catch (error) {
        console.error(`Error in registerFaculty() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const validateFacultyLoginDetails = async (email, password) => {
    try {
        const query = {
            text: `
                SELECT faculty_password FROM FacultyInfo WHERE faculty_email = $1
            `, values: [email]
        }

        const { rows, rowCount } = await pool.query(query);

        if (rowCount != 1) return {
            success: false,
            message: "Email is not registered",
            data: []
        }

        const storedPassword = rows[0]?.faculty_password;
        const checkPassword = await bcrypt.compare(password, storedPassword)

        if (!checkPassword) return {
            success: false,
            message: "Invalid Password",
            data: []
        }

        const fetchFacultyDataQuery = {
            text: `
                SELECT 
                    fi.faculty_id, 
                    fi.faculty_full_name, 
                    fi.faculty_email, 
                    ci.course_name, 
                    bi.branch_name 
                FROM FacultyInfo fi
                JOIN CourseInfo ci
                    ON ci.course_id = fi.course_id
                JOIN BranchInfo bi
                    on bi.branch_id = fi.branch_id
                WHERE faculty_email = $1
            `,
            values: [email]
        }

        const facultyData = await pool.query(fetchFacultyDataQuery)

        return {
            success: true,
            message: "Login Successful",
            data: facultyData.rows
        }
    } catch (error) {
        console.error(`Error in validateFacultyLoginDetails() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const registerStudent = async (fullName, email, password, courseId, branchId, semesterId, phone, dob) => {
    try {
        const studentExistsQuery = {
            text: `SELECT student_id FROM StudentInfo WHERE student_email = $1`,
            values: [email]
        }

        const studentExists = await pool.query(studentExistsQuery)

        if (studentExists.rowCount > 0) return {
            success: false,
            message: "Student with same email already exists",
            data: []
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = {
            text: `INSERT INTO StudentInfo(
                student_full_name,
                student_email,
                student_password,
                course_id,
                branch_id,
                semester_id,
                student_phone_number,
                student_dob
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            values: [fullName, email, hashedPassword, courseId, branchId, semesterId, phone, dob]
        }

        const { rows, rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: "Student Registration Successful",
            data: rows
        }
    } catch (error) {
        console.error(`Error in registerStudent() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const validateStudentLoginDetails = async (email, password) => {
    try {
        const query = {
            text: `
                SELECT student_password FROM StudentInfo WHERE student_email = $1
            `, values: [email]
        }

        const { rows, rowCount } = await pool.query(query);

        if (rowCount != 1) return {
            success: false,
            message: "Email is not registered",
            data: []
        }

        const storedPassword = rows[0]?.student_password;
        const checkPassword = await bcrypt.compare(password, storedPassword)

        if (!checkPassword) return {
            success: false,
            message: "Invalid Password",
            data: []
        }

        const fetchStudentDataQuery = {
            text: `
                SELECT 
                    si.student_id, 
                    si.student_full_name, 
                    si.student_email
                FROM StudentInfo si
                WHERE student_email = $1
            `,
            values: [email]
        }

        const studentData = await pool.query(fetchStudentDataQuery)

        return {
            success: true,
            message: "Login Successful",
            data: studentData.rows
        }
    } catch (error) {
        console.error(`Error in validateFacultyLoginDetails() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}