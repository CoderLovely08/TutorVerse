import {
  addStudentSkill,
  deleteStudentSkill,
  getAllBranches,
  getAllCourses,
  getAllSemesters,
  getAllSkills,
  getAllSkillsByStudentId,
  getAllTutorOtherSkills,
  getAllTutors,
  getStudentDetailsById,
  getTutorDetailsById,
} from "../modules/DbHelper.js";

export const handleViewStudentHome = async (req, res) => {
  try {
    const result = await getStudentDetailsById(req.user.userId);
    const tutorData = await getTutorDetailsById(req.user.userId);
    if (result.success)
      res.render("student/home", {
        studentData: result.data[0],
        tutorData: tutorData.data[0],
      });
    else throw Error("Error fetching student profile data");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

export const handleViewStudentSkills = async (req, res) => {
  try {
    const { userId } = req.user;
    const skills = await getAllSkills();
    const studentSkills = await getAllSkillsByStudentId(userId);

    if (skills.success)
      res.render("student/skills", {
        skills: skills.data,
        studentSkills: studentSkills,
      });
    else throw Error("Error fetching skills data");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

export const handlePostStudentSkills = async (req, res) => {
  try {
    const { userId } = req.user;
    const { skillId } = req.body;

    const result = await addStudentSkill(userId, skillId);

    res.json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Unable to process",
    });
  }
};

export const handleDeleteStudentSkills = async (req, res) => {
  try {
    const { userId } = req.user;
    const { skillId } = req.body;

    const result = await deleteStudentSkill(skillId);

    res.json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {}
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

export const handleViewTutorHome = async (req, res) => {
  try {
    const skills = await getAllSkills();
    const tutorData = await getTutorDetailsById(req.user.userId);

    res.render("student/tutor", {
      skills: skills.data,
      tutorData: tutorData.data[0],
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewSearch = async (req, res) => {
  try {
    const { skill } = req.query;

    const [skills, tutors, tutorOtherSkills] = await Promise.all([
      getAllSkills(),
      getAllTutors(true, skill),
      getAllTutorOtherSkills(),
    ]);

    res.render("student/search", {
      skills: skills.data,
      tutors: tutors.data,
      tutorOtherSkills,
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};
