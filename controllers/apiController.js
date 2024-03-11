import { getAllBranches, getAllCourses, getAllSemesters } from "../modules/DbHelper.js"

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