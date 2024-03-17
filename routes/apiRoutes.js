import { Router } from "express";
import {
  handleApplyTutor,
  handleDeleteStudentById,
  handleDeleteTutorById,
  handleFetchAllBranches,
  handleFetchAllCourses,
  handleFetchAllFaculty,
  handleFetchAllSemesters,
  handleFetchAllSkills,
  handleFetchAllStudents,
  handleFetchAllTutors,
  handleFetchFacultyById,
  handleFetchSkillById,
  handleFetchStudentById,
  handleFetchTutorById,
  handleUpdateStudentById,
  handleUpdateTutorById,
  handleVerifyStudentById,
} from "../controllers/apiController.js";
import { verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

// Endpoint to fetch all courses
router
  .route("/course")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchAllCourses);

// Endpoint to fetch all branches
router
  .route("/branch")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchAllBranches);

// Endpoint to fetch all semesters
router
  .route("/semester")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchAllSemesters);

// --------------------------------------------
//              STUDENT API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all students
 */
router
  .route("/student")
  .get(verifyTokenMiddleware(["faculty"]), handleFetchAllStudents);

/**
 * GET
 * Description: Endpoint to fetch a student by id
 */
router
  .route("/student/:studentId")
  .get(verifyTokenMiddleware(["faculty"]), handleFetchStudentById);

/**
 * PUT
 * Description: Endpoint to update a student by id
 */
router
  .route("/student/:studentId")
  .put(verifyTokenMiddleware(["student"]), handleUpdateStudentById);

/**
 * DELETE
 * Description: Endpoint to delete a student by id
 */
router
  .route("/student/:studentId")
  .delete(verifyTokenMiddleware(["faculty"]), handleDeleteStudentById);

// --------------------------------------------
//              SKILL API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all skills
 */
router
  .route("/skill")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchAllSkills);

/**
 * GET
 * Description: Endpoint to fetch a skill by id
 */
router
  .route("/skill/:skillId")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchSkillById);

// --------------------------------------------
//              FACULTY API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all faculties
 */
router
  .route("/faculty")
  .get(verifyTokenMiddleware(["faculty"]), handleFetchAllFaculty);

/**
 * GET
 * Description: Endpoint to fetch a faculty by id
 */
router
  .route("/faculty/:facultyId")
  .get(verifyTokenMiddleware(["faculty"]), handleFetchFacultyById);

/**
 * POST
 * Description: Endpoint to verify a student as tutor
 */
router
  .route("/faculty/verify")
  .post(verifyTokenMiddleware(["faculty"]), handleVerifyStudentById);

// --------------------------------------------
//              TUTOR API Routes
// --------------------------------------------
/**
 * GET
 * Description: Endpoint to fetch all tutors
 */
router
  .route("/tutor")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchAllTutors);

/**
 * GET
 * Description: Endpoint to fetch a tutor by id
 */
router
  .route("/tutor/:tutorId")
  .get(verifyTokenMiddleware(["faculty", "student"]), handleFetchTutorById);

/**
 * POST
 * Description: Endpoint to apply for a tutor role
 */
router
  .route("/tutor")
  .post(verifyTokenMiddleware(["student"]), handleApplyTutor);

/**
 * GET
 * Description: Endpoint to update a tutor by id
 */
router
  .route("/tutor/:tutorId")
  .put(verifyTokenMiddleware(["student"]), handleUpdateTutorById);

/**
 * GET
 * Description: Endpoint to delete a tutor by id
 */
router
  .route("/tutor/:tutorId")
  .delete(verifyTokenMiddleware(["faculty", "student"]), handleDeleteTutorById);

export default router;
