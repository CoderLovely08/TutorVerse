import { Router } from "express";
import { handleFetchAllBranches, handleFetchAllCourses, handleFetchAllSemesters } from "../controllers/apiController.js";

const router = Router();

router.route('/course').get(handleFetchAllCourses)

router.route('/branch').get(handleFetchAllBranches)

router.route('/semester').get(handleFetchAllSemesters)

export default router