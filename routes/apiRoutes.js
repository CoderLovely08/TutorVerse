import { Router } from "express";
import { handleFetchAllBranches, handleFetchAllCourses, handleFetchAllFaculty, handleFetchAllSemesters, handleFetchAllSkills, handleFetchAllStudents, handleFetchAllTutors } from "../controllers/apiController.js";

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
router.route('/student/:studentId').get(handleFetchAllStudents);

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
router.route('/skill/:skillId').get(handleFetchAllSkills);

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
router.route('/faculty/:facultyId').get(handleFetchAllFaculty);

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
router.route('/tutor/:tutorId').get(handleFetchAllTutors);


export default router