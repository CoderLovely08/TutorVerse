import pool from "../config/dbConfig.js";

export const getAllCourses = async () => {
  try {
    const query = {
      text: `SELECT * FROM CourseInfo`,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllBranches = async () => {
  try {
    const query = {
      text: `SELECT * FROM BranchInfo`,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllSemesters = async () => {
  try {
    const query = {
      text: `SELECT * FROM SemesterInfo`,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllStudents = async (courseId = 0, branchId = 0) => {
  try {
    let query = {
      text: `
            SELECT * FROM StudentInfo si 
            JOIN CourseInfo ci
                ON ci.course_id = si.course_id
            JOIN BranchInfo bi 
                ON bi.branch_id = si.branch_id
            JOIN SemesterInfo semi
                ON semi.semester_id = si.semester_id
            WHERE 1 = 1 
            `,
    };
    let values = [];

    if (courseId != 0) {
      query.text += ` AND ci.course_id = $${values.length + 1}`;
      values.push(courseId);
    }

    if (branchId != 0) {
      query.text += ` AND bi.branch_id = $${values.length + 1}`;
      values.push(branchId);
    }

    const { rows } = await pool.query(query, values);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getStudentDetailsById = async (studentId = 0) => {
  try {
    const query = {
      text: `
            SELECT * FROM StudentInfo si 
            JOIN CourseInfo ci
                ON ci.course_id = si.course_id
            JOIN BranchInfo bi 
                ON bi.branch_id = si.branch_id
            JOIN SemesterInfo semi
                ON semi.semester_id = si.semester_id
            WHERE si.student_id = $1
            `,
      values: [studentId],
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const updateStudentById = async (studentId, updateObject) => {
  try {
    const fieldUpdates = updateObject
      .map(({ field, value }) => {
        return `${field} = '${value}'`;
      })
      .join(", ");

    const query = {
      text: `UPDATE StudentInfo SET ${fieldUpdates} WHERE student_id = $1`,
      values: [studentId],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1 ? "Student record updated" : "Student record not found",
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const deleteStudentById = async (studentId) => {
  try {
    const query = {
      text: `DELETE FROM StudentInfo WHERE student_id = $1`,
      values: [studentId],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1 ? "Student record deleted" : "Student record not found",
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

// -----------------------------------------------------------
//                  Skill Related Methods
// -----------------------------------------------------------
/**
 * Fetches all skills from the database.
 * @returns {Object} An object containing success status, message, and fetched data.
 */
export const getAllSkills = async () => {
  try {
    const query = {
      text: `SELECT * FROM SkillsInfo ORDER BY skill_name`,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getSkillBySkillId = async (id) => {
  try {
    const query = {
      text: `SELECT * FROM SkillsInfo WHERE skill_id = $1`,
      values: [id],
    };

    const { rows, rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message: rowCount == 1 ? "Data fetched" : "Skill Id does not exists",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllFaculty = async () => {
  try {
    const query = {
      text: `
            SELECT * FROM FacultyInfo fi
            JOIN CourseInfo ci
                ON ci.course_id = fi.course_id
            JOIN BranchInfo bi
                ON bi.branch_id = fi.branch_id
            `,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getFacultyById = async (id) => {
  try {
    const query = {
      text: `
            SELECT * FROM FacultyInfo fi
            JOIN CourseInfo ci
                ON ci.course_id = fi.course_id
            JOIN BranchInfo bi
                ON bi.branch_id = fi.branch_id
            WHERE fi.faculty_id = $1
            `,
      values: [id],
    };
    const { rows, rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message: rowCount == 1 ? "Data fetched" : "Faculty Id does not exists",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const markStudentVerifiedById = async (studentId, facultyId) => {
  try {
    const query = {
      text: `
            UPDATE TutorInfo 
                SET is_verified = true, faculty_id = $1 
            WHERE student_id = $2
            `,
      values: [studentId, facultyId],
    };

    const { rows, rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Student Verified as a tutor"
          : "Student Id does not exists",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getAllTutors = async () => {
  try {
    const query = {
      text: `
      SELECT 
        ti.tutor_id,
        si.student_id,
        si.student_full_name,
        ski.skill_name,
        ti.skill_description,
        ti.is_verified,
        ti.tutor_rating,
        si.student_email,
        si.student_phone_number,
        si.student_profile_src,
        ci.course_name,
        bi.branch_name,
        semi.semester_name,
        fi.faculty_full_name
      FROM TutorInfo ti
      JOIN StudentInfo si
          ON si.student_id = ti.tutor_id
      JOIN SkillsInfo ski
          ON ski.skill_id = ti.skill_id
      JOIN CourseInfo ci
          ON ci.course_id = si.course_id
      JOIN BranchInfo bi
          ON bi.branch_id = si.branch_id
      JOIN SemesterInfo semi
          ON semi.semester_id = si.semester_id
      JOIN FacultyInfo fi 
          ON fi.faculty_id = ti.faculty_id
      `,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const getTutorDetailsById = async (id) => {
  try {
    const query = {
      text: `
            SELECT * FROM TutorInfo ti
            JOIN StudentInfo si
                ON si.student_id = ti.tutor_id
            JOIN SkillsInfo ski
                ON ski.skill_id = ti.skill_id
            JOIN CourseInfo ci
                ON ci.course_id = si.course_id
            JOIN BranchInfo bi
                ON bi.branch_id = si.branch_id
            JOIN SemesterInfo semi
                ON semi.semester_id = si.semester_id
            JOIN FacultyInfo fi 
                ON fi.faculty_id = ti.faculty_id
            WHERE si.student_id = $1
            `,
      values: [id],
    };

    const { rows, rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message: rowCount == 1 ? "Data fetched" : "Tutor details not found",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const applyForTutor = async (studentId = 1, skillId, description) => {
  try {
    console.log(studentId, skillId, description);
    const tutorExistsQuery = {
      text: `
            SELECT tutor_id FROM TutorInfo
            WHERE student_id = $1 AND skill_id = $2
            `,
      values: [studentId, skillId],
    };

    const tutorExists = await pool.query(tutorExistsQuery);

    if (tutorExists.rowCount > 0)
      return {
        success: false,
        message: "You are already a tutor for the selected skill",
        data: [],
      };
    const query = {
      text: `
        INSERT INTO TutorInfo(
            student_id, 
            skill_id, 
            skill_description
        ) VALUES ($1, $2, $3)
      `,
      values: [studentId, skillId, description],
    };

    const { rowCount, rows } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Application for tutor submitted succesfully"
          : "Unable to process application.",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};
