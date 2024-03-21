import { Router } from "express";
import {
  handleViewFacultyHome,
  handleViewFacultyLogin,
  handleViewFacultyRegister,
} from "../controllers/facultyController.js";
import { isLoggedIn, verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyHome);

router.route("/login").get(isLoggedIn, handleViewFacultyLogin);

router.route("/register").get(isLoggedIn, handleViewFacultyRegister);
export default router;
