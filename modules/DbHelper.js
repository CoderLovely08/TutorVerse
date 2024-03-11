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

