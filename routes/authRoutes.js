import { Router } from "express";
import { handleFacultyLogin, handleFacultyRegister, handlePostPasswordChange, handlePostPasswordRecovery, handleStudentLogin, handleStudentRegistration, handleUserLogout, handleViewPasswordChange, handleViewPasswordRecovery } from "../controllers/authController.js";
import { verifyPassTokenMiddleware } from "../middlewares/jwt.js";
const router = Router();

router.route('/faculty/register').post(handleFacultyRegister)
router.route('/faculty/login').post(handleFacultyLogin)

router.route('/student/register').post(handleStudentRegistration)
router.route('/student/login').post(handleStudentLogin)

router.route('/password').get(handleViewPasswordRecovery)
    .post(handlePostPasswordRecovery)

router.route('/reset-password').get(verifyPassTokenMiddleware, handleViewPasswordChange)
    .post(verifyPassTokenMiddleware, handlePostPasswordChange)


router.route('/logout').post(handleUserLogout)


export default router