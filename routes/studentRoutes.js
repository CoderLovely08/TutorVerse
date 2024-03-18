import { Router } from "express";
import { handleViewStudentHome, handleViewStudentLogin, handleViewStudentRegister } from "../controllers/studentController.js";
import { verifyTokenMiddleware } from "../middlewares/jwt.js";

const router = Router();

router
  .route("/home")
    .get(verifyTokenMiddleware(["student"]), handleViewStudentHome);

router.route("/register").get(handleViewStudentRegister);

router.route("/login").get(handleViewStudentLogin);
export default router;
