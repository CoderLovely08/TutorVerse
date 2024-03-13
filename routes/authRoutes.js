import { Router } from "express";
import { handleFacultyLogin, handleFacultyRegister, handleStudentRegistration } from "../controllers/authController.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post(handleFacultyLogin)

router.route('/student/register').post(handleStudentRegistration)
router.route('/student/login').post()


export default router