import { Router } from "express";
import {
  handleDeleteStudentSkills,
  handlePostStudentSkills,
  handleViewStudentHome,
  handleViewStudentLogin,
  handleViewStudentRegister,
  handleViewStudentSkills,
} from "../controllers/studentController.js";
import { isLoggedIn, verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["student"]), handleViewStudentHome);

router
  .route("/skill")
  .get(verifyTokenMiddleware(["student"]), handleViewStudentSkills)
  .post(verifyTokenMiddleware(["student"]), handlePostStudentSkills)
  .delete(verifyTokenMiddleware(["student"]), handleDeleteStudentSkills)

router.route("/register").get(isLoggedIn, handleViewStudentRegister);

router.route("/login").get(isLoggedIn, handleViewStudentLogin);
export default router;
