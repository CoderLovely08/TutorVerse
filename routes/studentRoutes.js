import { Router } from "express";
import {
  handleViewStudentHome,
  handleViewStudentLogin,
  handleViewStudentRegister,
} from "../controllers/studentController.js";
import { isLoggedIn, verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["student"]), handleViewStudentHome);

router.route("/register").get(isLoggedIn, handleViewStudentRegister);

router.route("/login").get(isLoggedIn, handleViewStudentLogin);
export default router;
