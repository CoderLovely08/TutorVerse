import pool from "../config/dbConfig.js";

export const getAllCourses = async () => {
    try {
        const query = {
            text: `SELECT * FROM CourseInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllBranches = async () => {
    try {
        const query = {
            text: `SELECT * FROM BranchInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllSemesters = async () => {
    try {
        const query = {
            text: `SELECT * FROM SemesterInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllStudents = async (courseId = 0, branchId = 0) => {
    try {
        let query = {
            text: `
            SELECT * FROM StudentInfo si 
            JOIN CourseInfo ci
                ON ci.course_id = si.course_id
            JOIN BranchInfo bi 
                ON bi.branch_id = si.branch_id
            JOIN SemesterInfo semi
                ON semi.semester_id = si.semester_id
            WHERE 1 = 1 
            `
        }
        let values = []

        if (courseId != 0) {
            query.text += ` AND ci.course_id = $${values.length + 1}`
            values.push(courseId)
        }
        
        if (branchId != 0) {
            query.text += ` AND bi.branch_id = $${values.length + 1}`
            values.push(branchId)
        }

        console.log(query, values);

        const { rows } = await pool.query(query, values);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllSkills = async () => {
    try {
        const query = {
            text: `SELECT * FROM SkillsInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllFaculty = async () => {
    try {
        const query = {
            text: `SELECT * FROM FacultyInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const getAllTutors = async () => {
    try {
        const query = {
            text: `SELECT * FROM TutorInfo`,
        }

        const { rows } = await pool.query(query);
        return {
            success: true,
            message: "Data fetched",
            data: rows
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}