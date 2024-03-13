import { Router } from "express";
import { handleFacultyLogin, handleFacultyRegister } from "../controllers/authController.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post(handleFacultyLogin)

router.route('/student/register').post()
router.route('/student/login').post()


export default router