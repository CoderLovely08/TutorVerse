import { getAllBranches, getAllCourses, getAllFaculty, getAllSemesters, getAllSkills, getAllStudents, getAllTutors, getStudentDetailsById } from "../modules/DbHelper.js"

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
        res.status(result.success ? 200 : 400).json(result);
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
        res.status(result.success ? 200 : 404).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleFetchStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;
        const result = await getStudentDetailsById(studentId);
        res.status(result.success ? 200 : 404).json(result)
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
        const result = await getAllSkills();
        res.status(result.success ? 200 : 404).json(result);
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
        const result = await getAllFaculty();
        res.status(result.success ? 200 : 404).json(result);
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
        const result = await getAllTutors();
        res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: []
        })
    }
}

export const handleUpdateStudentById = async () => {

}

export const handleDeleteStudentById = async () => {

}

export const handleFetchSkillById = async() => {
    
}

export const handleFetchFacultyById = async () => {

}

export const handleFetchTutorById = async () => {

}

export const handleUpdateTutorById = async() => {
    
}

export const handleDeleteTutorById = async () => {
    
}