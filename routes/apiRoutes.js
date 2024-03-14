import { Router } from "express";
import { handleFetchAllBranches, handleFetchAllCourses, handleFetchAllFaculty, handleFetchAllSemesters, handleFetchAllSkills, handleFetchAllStudents, handleFetchAllTutors } from "../controllers/apiController.js";

const router = Router();

router.route('/course').get(handleFetchAllCourses)

router.route('/branch').get(handleFetchAllBranches)

router.route('/semester').get(handleFetchAllSemesters)

router.route('/student').get(handleFetchAllStudents)

router.route('/skills').get(handleFetchAllSkills)

router.route('/faculty').get(handleFetchAllFaculty)

router.route('/tutors').get(handleFetchAllTutors)

export default router