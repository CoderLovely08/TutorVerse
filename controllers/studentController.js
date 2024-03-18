import {
  getAllBranches,
  getAllCourses,
  getAllSemesters,
} from "../modules/DbHelper.js";

export const handleViewStudentHome = async (req, res) => {
  try {
    res.render("student/home");
  } catch (error) {
    res.render("404");
  }
};

export const handleViewStudentRegister = async (req, res) => {
  try {
    const [courseData, branchData, semesterData] = await Promise.all([
      getAllCourses(),
      getAllBranches(),
      getAllSemesters(),
    ]);
    res.render("student/register", {
      dropdownOptions: { courseData, branchData, semesterData },
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewStudentLogin = async (req, res) => {
  try {
    res.render("student/login");
  } catch (error) {
    res.render("404");
  }
};
