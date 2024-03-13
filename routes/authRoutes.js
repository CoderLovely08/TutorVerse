import { Router } from "express";
import { handleFacultyLogin, handleFacultyRegister, handleStudentLogin, handleStudentRegistration } from "../controllers/authController.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post(handleFacultyLogin)

router.route('/student/register').post(handleStudentRegistration)
router.route('/student/login').post(handleStudentLogin)


export default router