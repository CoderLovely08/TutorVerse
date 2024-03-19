import { Router } from "express";
import {
  handleViewFacultyHome,
  handleViewFacultyLogin,
} from "../controllers/facultyController.js";
import { isLoggedIn, verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyHome);

router.route("/login").get(isLoggedIn, handleViewFacultyLogin);
export default router;
