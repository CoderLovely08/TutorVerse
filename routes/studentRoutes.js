import { Router } from "express";
import {
  handleDeleteStudentSkills,
  handlePostStudentSkills,
  handlePostTutor,
  handleViewSearch,
  handleViewStudentHome,
  handleViewStudentLogin,
  handleViewStudentRegister,
  handleViewStudentSkills,
  handleViewTutorHome,
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
  .delete(verifyTokenMiddleware(["student"]), handleDeleteStudentSkills);

router
  .route("/tutor")
  .get(verifyTokenMiddleware(["student"]), handleViewTutorHome)
  .post(verifyTokenMiddleware(["student"]), handlePostTutor);

router
  .route("/search")
  .get(verifyTokenMiddleware(["student"]), handleViewSearch);

router.route("/register").get(isLoggedIn, handleViewStudentRegister);

router.route("/login").get(isLoggedIn, handleViewStudentLogin);
export default router;
