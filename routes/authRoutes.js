import { Router } from "express";
import { handleFacultyLogin, handleFacultyRegister, handlePostPasswordRecovery, handleStudentLogin, handleStudentRegistration, handleUserLogout, handleViewPasswordRecovery } from "../controllers/authController.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post(handleFacultyLogin)

router.route('/student/register').post(handleStudentRegistration)
router.route('/student/login').post(handleStudentLogin)

router.route('/password').get(handleViewPasswordRecovery)
    .post(handlePostPasswordRecovery)

router.route('/reset-password').get(handleViewPasswordChange)
    .post(handlePostPasswordChange)


router.route('/logout').post(handleUserLogout)


export default router