import { Router } from "express";
import {
  handleViewFacultyDashboard,
  handleViewFacultyHome,
  handleViewFacultyLogin,
  handleViewFacultyRegister,
  handleViewFacultyVerifyPage,
} from "../controllers/facultyController.js";
import { isLoggedIn, verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyHome);

router
  .route("/dashboard")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyDashboard);

router
  .route("/verify")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyVerifyPage);

router.route("/login").get(isLoggedIn, handleViewFacultyLogin);

router.route("/register").get(isLoggedIn, handleViewFacultyRegister);
export default router;
