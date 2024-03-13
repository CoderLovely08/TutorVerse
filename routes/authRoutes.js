import { Router } from "express";
import { handleFacultyRegister } from "../controllers/authController.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post()

router.route('/student/register').post()
router.route('/student/login').post()


export default router