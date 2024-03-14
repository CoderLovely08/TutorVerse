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

// -----------------------------------------------------------
//                  Student route handlers
// -----------------------------------------------------------
/**
 * Handle fetching all students.
 * 
 * This function sends a GET request to fetch all students based on a specific course ID and branch ID.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either the fetched students or an error message.
 */
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

/**
 * Handle fetching a student by their ID.
 * 
 * This function sends a GET request to fetch details of a student based on their ID.
 * 
 * @param {object} req - The request object containing the student ID.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either the fetched student details or an error message.
 */
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

// -----------------------------------------------------------
//                  Skill route handlers
// -----------------------------------------------------------
/**
 * Handle fetching all skills.
 * 
 * This function sends a GET request to fetch all skills available.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either the fetched skills or an error message.
 */
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

// -----------------------------------------------------------
//                  Faculty route handlers
// -----------------------------------------------------------
/**
 * Handle fetching all faculty members.
 * 
 * This function sends a GET request to fetch all faculty members available.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either the fetched faculty members or an error message.
 */
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

// -----------------------------------------------------------
//                  Tutor route handlers
// -----------------------------------------------------------
/**
 * Handle fetching all tutors.
 * 
 * This function sends a GET request to fetch all tutors available.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either the fetched tutors or an error message.
 */
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