import { Router } from "express";
import {
  handleViewFacultyHome,
  handleViewFacultyLogin,
} from "../controllers/facultyController.js";
import { verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
  .get(verifyTokenMiddleware(["faculty"]), handleViewFacultyHome);

router.route("/login").get(handleViewFacultyLogin);
export default router;
