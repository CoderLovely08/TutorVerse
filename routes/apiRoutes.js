import { Router } from "express";
import { handleDeleteStudentById, handleDeleteTutorById, handleFetchAllBranches, handleFetchAllCourses, handleFetchAllFaculty, handleFetchAllSemesters, handleFetchAllSkills, handleFetchAllStudents, handleFetchAllTutors, handleFetchFacultyById, handleFetchSkillById, handleFetchStudentById, handleFetchTutorById, handleUpdateStudentById, handleUpdateTutorById } from "../controllers/apiController.js";

const router = Router();

// Endpoint to fetch all courses
router.route('/course').get(handleFetchAllCourses);

// Endpoint to fetch all branches
router.route('/branch').get(handleFetchAllBranches);

// Endpoint to fetch all semesters
router.route('/semester').get(handleFetchAllSemesters);


// --------------------------------------------
//              STUDENT API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all students
 */
router.route('/student').get(handleFetchAllStudents);

/**
 * GET
 * Description: Endpoint to fetch a student by id
 */
router.route('/student/:studentId').get(handleFetchStudentById);

/**
 * PUT
 * Description: Endpoint to update a student by id
 */
router.route('/student/:studentId').put(handleUpdateStudentById);

/**
 * DELETE
 * Description: Endpoint to delete a student by id
 */
router.route('/student/:studentId').delete(handleDeleteStudentById);

// --------------------------------------------
//              SKILL API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all skills
 */
router.route('/skill').get(handleFetchAllSkills);

/**
 * GET
 * Description: Endpoint to fetch a skill by id
 */
router.route('/skill/:skillId').get(handleFetchSkillById);

// --------------------------------------------
//              FACULTY API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all faculties
 */
router.route('/faculty').get(handleFetchAllFaculty);

/**
 * GET
 * Description: Endpoint to fetch a faculty by id
 */
router.route('/faculty/:facultyId').get(handleFetchFacultyById);

// --------------------------------------------
//              TUTOR API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all tutors
 */
router.route('/tutor').get(handleFetchAllTutors);

/**
 * GET
 * Description: Endpoint to fetch a tutor by id
 */
router.route('/tutor/:tutorId').get(handleFetchTutorById);

/**
 * GET
 * Description: Endpoint to update a tutor by id
 */
router.route('/tutor/:tutorId').put(handleUpdateTutorById);

/**
 * GET
 * Description: Endpoint to delete a tutor by id
 */
router.route('/tutor/:tutorId').delete(handleDeleteTutorById);


export default router