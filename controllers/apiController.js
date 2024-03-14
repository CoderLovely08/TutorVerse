import { getAllBranches, getAllCourses, getAllSemesters, getAllStudents } from "../modules/DbHelper.js"

export const handleFetchAllCourses = async (req, res) => {
    try {
        const result = await getAllCourses();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllBranches = async (req, res) => {
    try {
        const result = await getAllBranches();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllSemesters = async (req, res) => {
    try {
        const result = await getAllSemesters();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllStudents = async(req, res) => {
    try {
        // Todo implement this method here
        const courseId = 1
        const branchId = 2
        const result = await getAllStudents(courseId, branchId)
        res.status(result.success ? 200 : 400).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllSkills = async (req, res) => {
    try {
        // Todo implement this method here
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllFaculty = async (req, res) => {
    try {
        // Todo implement this method here
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchAllTutors = async (req, res) => {
    try {
        // Todo implement this method here
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}