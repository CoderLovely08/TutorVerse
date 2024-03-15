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

export const getStudentDetailsById = async (studentId = 0) => {
    try {
        const query = {
            text: `
            SELECT * FROM StudentInfo si 
            JOIN CourseInfo ci
                ON ci.course_id = si.course_id
            JOIN BranchInfo bi 
                ON bi.branch_id = si.branch_id
            JOIN SemesterInfo semi
                ON semi.semester_id = si.semester_id
            WHERE si.student_id = $1
            `,
            values: [studentId]
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

export const updateStudentById = async (studentId, updateObject) => {
    try {
        const fieldUpdates = updateObject.map(({ field, value }) => {
            return `${field} = '${value}'`;
        }).join(', ');

         const query = {
            text: `UPDATE StudentInfo SET ${fieldUpdates} WHERE student_id = $1`,
            values: [studentId]
        };

        const { rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: rowCount == 1 ? "Student record updated" : "Student record not found",
            data: []
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}

export const deleteStudentById = async (studentId) => {
    try {
        const query = {
            text: `DELETE FROM StudentInfo WHERE student_id = $1`,
            values: [studentId]
        }

        const { rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: rowCount == 1 ? "Student record deleted" : "Student record not found",
            data: []
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}


// -----------------------------------------------------------
//                  Skill Related Methods
// -----------------------------------------------------------
/**
 * Fetches all skills from the database.
 * @returns {Object} An object containing success status, message, and fetched data.
 */
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

export const getSkillBySkillId = async (id) => {
    try {
        const query = {
            text: `SELECT * FROM SkillsInfo WHERE skill_id = $1`,
            values: [id]
        }

        const { rows, rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: rowCount == 1 ? "Data fetched" : "Skill Id does not exists",
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