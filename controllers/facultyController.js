import {
  getAllBranches,
  getAllCourses,
  getAllStudents,
  getFacultyById,
  getVerifiedStudentCountByFaculty,
} from "../modules/DbHelper.js";

export const handleViewFacultyLogin = async (req, res) => {
  try {
    res.render("faculty/login");
  } catch (error) {
    res.render("error");
  }
};

export const handleViewFacultyRegister = async (req, res) => {
  try {
    const [courseData, branchData] = await Promise.all([
      getAllCourses(),
      getAllBranches(),
    ]);
    res.render("faculty/register", {
      dropdownOptions: { facultyData: result, courseData, branchData },
    });
  } catch (error) {
    res.render("error");
  }
};

export const handleViewFacultyHome = async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await getFacultyById(userId);
    const countResult = await getVerifiedStudentCountByFaculty(userId);
    res.render("faculty/home", {
      facultyData: result.data[0],
      countResult,
    });
  } catch (error) {
    res.render("error");
  }
};

export const handleViewFacultyDashboard = async (req, res) => {
  try {
    const { courseId, branchId } = req.user;
    const students = await getAllStudents(courseId, branchId);
    res.render("faculty/dashboard", {
      students: students.data,
    });
  } catch (error) {
    res.render("error");
  }
};
