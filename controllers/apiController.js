import validator from "validator";
import {
  applyForTutor,
  deleteStudentById,
  getAllBranches,
  getAllCourses,
  getAllFaculty,
  getAllSemesters,
  getAllSkills,
  getAllStudents,
  getAllTutors,
  getFacultyById,
  getSkillBySkillId,
  getStudentDetailsById,
  getTutorDetailsById,
  markStudentVerifiedById,
  updateStudentById,
} from "../modules/DbHelper.js";

export const handleFetchAllCourses = async (req, res) => {
  try {
    const result = await getAllCourses();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleFetchAllBranches = async (req, res) => {
  try {
    const result = await getAllBranches();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleFetchAllSemesters = async (req, res) => {
  try {
    const result = await getAllSemesters();
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

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
export const handleFetchAllStudents = async (req, res) => {
  try {
    // Todo implement this method here
    const courseId = 1;
    const branchId = 2;
    const result = await getAllStudents(courseId, branchId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

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
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

/**
 * Handle updating a student by their ID.
 *
 * This function sends a PUT request to update a student based on their ID.
 *
 * @param {object} req - The request object containing the student ID and updateObject.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either a success message or an error message.
 */

export const handleUpdateStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { updateObject } = req.body;
    const result = await updateStudentById(studentId, updateObject);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

/**
 * Handle deleting a student by their ID.
 *
 * This function sends a DELETE request to delete a student based on their ID.
 *
 * @param {object} req - The request object containing the student ID.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing either a success message or an error message.
 */
export const handleDeleteStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await deleteStudentById(studentId);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

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
      data: [],
    });
  }
};

/**
 * Handles the fetch request to get a skill by its ID.
 *
 * This function sends a GET request to fetch a skill by its skill id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const handleFetchSkillById = async (req, res) => {
  try {
    const { skillId } = req.params;

    if (!validator.isNumeric(skillId))
      return res.json({
        success: false,
        message:
          "skillId param is missing, and it should be an integer.\nEx: /api/skill/12",
      });
    const result = await getSkillBySkillId(skillId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

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
    const result = await getAllFaculty();
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

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
    const { status } = req.query;
    if (!status || !validator.isBoolean(status))
      return res.json({
        success: false,
        message: "Param 'status' of type boolean is missing",
      });
    const result = await getAllTutors(status);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleFetchFacultyById = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const result = await getFacultyById(facultyId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleVerifyStudentById = async (req, res) => {
  try {
    const { tutorId, isVerified, remark } = req.body;
    const { userId } = req.user || 1;
    const result = await markStudentVerifiedById(
      tutorId,
      userId,
      isVerified, remark
    );
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleFetchTutorById = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const result = await getTutorDetailsById(tutorId);
    res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleApplyTutor = async (req, res) => {
  try {
    const { userId } = req.user;
    const { skillId, title, description } = req.body;

    if (!validator.isAlpha(title.replaceAll(" ", "")))
      return res.json({
        success: false,
        message: "Title can only contain uppercase and lowercase letters",
      });

    if (!description || description.length < 30)
      return res.json({
        success: false,
        message: "Provide an elaborated description about your skill",
      });

    const result = await applyForTutor(userId, skillId, title, description);
    
    res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

export const handleUpdateTutorById = async () => {};

export const handleDeleteTutorById = async (req, res) => {};
