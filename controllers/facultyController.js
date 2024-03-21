import {
  getAllBranches,
  getAllCourses,
  getFacultyById,
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
    res.render("faculty/home", {
      facultyData: result.data[0],
    });
  } catch (error) {
    res.render("error");
  }
};
