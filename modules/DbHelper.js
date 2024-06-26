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
            LEFT JOIN TutorInfo ti
                ON ti.student_id = si.student_id
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

export const getAllUnverifiedStudents = async (courseId = 0, branchId = 0) => {
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
			      JOIN TutorInfo ti
				        ON ti.student_id = si.student_id
            JOIN SkillsInfo ski
              ON ski.skill_id = ti.skill_id
            WHERE NOT ti.is_verified AND NOT ti.is_rejected
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
            SELECT 
              si.student_id,
              si.student_full_name,
              si.student_email,
              si.student_phone_number,
              si.student_dob,
              si.student_profile_src,
              si.student_gender,
              si.student_university_id,
              ci.course_name,
              bi.branch_name,
              semi.semester_name
            FROM StudentInfo si 
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

/**
 * Asynchronously retrieves information about all faculty members. This function
 * joins the FacultyInfo, CourseInfo, and BranchInfo tables to provide comprehensive details
 * about each faculty member, including their associated course and branch.
 *
 * @returns {Promise<Object>} An object containing the success status, a message indicating the result of the operation,
 *                            and an array of data with all faculty members' information.
 */
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

/**
 * Asynchronously retrieves detailed information about a faculty member by their ID. The function
 * joins the FacultyInfo, CourseInfo, and BranchInfo tables to gather comprehensive details about
 * the faculty member, including their associated course and branch.
 *
 * @param {number} id - The unique identifier of the faculty member whose information is to be retrieved.
 * @returns {Promise<Object>} An object containing the success status, a message indicating whether
 *                            the faculty information was successfully fetched, and the data of the faculty member.
 */
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

/**
 * Asynchronously updates the verification status of a student (tutor) by their ID. This function
 * marks the student as verified or rejected based on the input parameters. It updates the TutorInfo
 * table, setting the `is_verified` or `is_rejected` flag and recording the faculty's remarks.
 *
 * @param {number} tutorId - The unique identifier of the tutor whose verification status is being updated.
 * @param {number} facultyId - The unique identifier of the faculty who is verifying or rejecting the tutor.
 * @param {boolean|string} isVerified - A boolean or string value indicating whether the tutor is being verified (true) or rejected (false).
 * @param {string} remark - Remarks provided by the faculty about the verification or rejection.
 * @returns {Promise<Object>} An object containing the success status, a message describing the outcome of the operation,
 *                            and any data returned from the query.
 */
export const markStudentVerifiedById = async (
  tutorId,
  facultyId,
  isVerified,
  remark
) => {
  try {
    const query = {
      text: `
            UPDATE TutorInfo 
                SET ${
                  isVerified == "true" ? "is_verified" : "is_rejected"
                } = $3, faculty_id = $2, faculty_remark = $4
            WHERE tutor_id = $1
            `,
      values: [tutorId, facultyId, isVerified == "true" ? true : true, remark],
    };

    const { rows, rowCount } = await pool.query(query);

    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? isVerified == "true"
            ? "Student Verified as a tutor"
            : "Student application rejected"
          : "Student Id does not exists",
      data: rows,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

/**
 * Asynchronously retrieves all tutors based on verification status and optional skill.
 * 
 * @param {boolean} status - The verification status to filter tutors (true or false).
 * @param {number} [skillId] - Optional skill ID to further filter tutors by their skills.
 * @returns {Promise<Object>} An object containing the success status, message, and data of tutors.
 */
export const getAllTutors = async (status = true, skillId) => {
  try {
    let query = {
      text: `
      SELECT 
        ti.tutor_id,
        si.student_id,
        si.student_full_name,
        ski.skill_name,
        ti.tutor_title,
        ti.skill_description,
        ti.is_verified,
        ti.tutor_rating,
        si.student_email,
        si.student_phone_number,
        si.student_profile_src,
        ci.course_name,
        bi.branch_name,
        semi.semester_name,
        fi.faculty_full_name,
        ti.created_at
      FROM TutorInfo ti
      JOIN StudentInfo si
          ON si.student_id = ti.student_id
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
      WHERE ti.is_verified = $1
      `,
      values: [status],
    };

    if (skillId) {
      query.text += ` AND ti.skill_id = $2`;
      query.values.push(skillId);
    }

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

/**
 * Asynchronously retrieves details of a specific tutor based on their associated student ID.
 * This function queries multiple related tables to compile comprehensive details about the tutor,
 * including their personal info, skills, academic background, and verification status.
 *
 * @param {number} id - The unique identifier for the tutor, typically associated with their student ID.
 * @returns {Promise<Object>} An object containing the success status, message, and the tutor's details,
 *                            or an error message if the operation fails.
 */
export const getTutorDetailsById = async (id) => {
  try {
    const query = {
      text: `
            SELECT 
              ti.tutor_id,
              si.student_id,
              si.student_full_name,
              ti.tutor_title,
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
              fi.faculty_full_name,
              ti.is_rejected,
              ti.faculty_remark,
              ti.created_at
            FROM TutorInfo ti
            JOIN StudentInfo si
                ON si.student_id = ti.student_id
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
            ORDER by ti.tutor_id DESC LIMIT 1
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

/**
 * Asynchronously applies for a tutor position for a student with a specific skill. It first checks if
 * the student already has an application for the same skill that is verified and not rejected.
 * If not, it proceeds to insert or update the tutor application in the TutorInfo table.
 *
 * @param {number} studentId - The ID of the student applying for the tutor position. Default is 1.
 * @param {number} skillId - The ID of the skill for which the student is applying to be a tutor.
 * @param {string} title - The title or subject the student wants to tutor in.
 * @param {string} description - A description of the student's skills and experience in the subject.
 * @returns {Promise<Object>} An object containing the success status, a message indicating the result
 *                            of the application, and an empty data array.
 */
export const applyForTutor = async (
  studentId = 1,
  skillId,
  title,
  description
) => {
  try {
    const tutorExistsQuery = {
      text: `
            SELECT tutor_id FROM TutorInfo
            WHERE student_id = $1 AND skill_id = $2 AND is_verified AND NOT is_rejected
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
            tutor_title,
            skill_description
        ) VALUES ($1, $2, $3, $4)
        ON CONFLICT (student_id, skill_id)
        DO UPDATE SET
            tutor_title = EXCLUDED.tutor_title,
            skill_description = EXCLUDED.skill_description,
            is_rejected = false
      `,
      values: [studentId, skillId, title, description],
    };

    const { rowCount } = await pool.query(query);

    return {
      success: rowCount > 0,
      message:
        rowCount > 0
          ? "Application for tutor submitted successfully"
          : "Unable to process application.",
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

/**
 * Asynchronously adds a new skill to a student's profile. It first checks if the skill already exists
 * for the student to avoid duplicates. If the skill doesn't exist, it adds the new skill to the student's
 * profile in the StudentSkillsInfo table.
 *
 * @param {number} studentId - The ID of the student to whom the skill will be added.
 * @param {number} skillId - The ID of the skill to be added to the student's profile.
 * @returns {Promise<Object>} An object containing the success status and a message indicating whether
 *                            the skill was successfully added or if it already exists.
 */
export const addStudentSkill = async (studentId, skillId) => {
  try {
    const checkQuery = {
      text: `
      SELECT skill_id FROM StudentSkillsInfo 
      WHERE student_id =$1 
        AND skill_id = $2`,
      values: [studentId, skillId],
    };

    const checkResults = await pool.query(checkQuery);

    if (checkResults.rowCount > 0)
      return {
        success: false,
        message: "Skill already exists",
      };

    const query = {
      text: `INSERT INTO StudentSkillsInfo(
        student_id, skill_id
        ) VALUES ($1, $2)`,
      values: [studentId, skillId],
    };

    const { rowCount } = await pool.query(query);

    return {
      success: true,
      message: "Skill added",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Asynchronously retrieves all skills associated with a given student ID. 
 * It fetches the skill details from the StudentSkillsInfo table and joins with the SkillsInfo table
 * to get the skill names.
 *
 * @param {number} id - The ID of the student whose skills are to be fetched.
 * @returns {Promise<Array>} An array of skill objects associated with the student,
 *                           or an empty array if an error occurs or no skills are found.
 */
export const getAllSkillsByStudentId = async (id) => {
  try {
    const qurey = {
      text: `
      SELECT
        ssi.student_skill_id,
        si.skill_name FROM StudentSkillsInfo ssi
        JOIN SkillsInfo si
          ON ssi.skill_id = si.skill_id
        WHERE student_id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(qurey);
    return rows;
  } catch (error) {
    return [];
  }
};

/**
 * Asynchronously deletes a skill from a student's profile based on the student_skill_id.
 * This function performs a deletion in the StudentSkillsInfo table.
 *
 * @param {number} id - The unique identifier for the student's skill (student_skill_id)
 *                      that needs to be deleted.
 * @returns {Promise<Object>} An object containing the success status and a message indicating whether
 *                            the skill was successfully deleted or if the mapping was not found.
 */
export const deleteStudentSkill = async (id) => {
  try {
    const query = {
      text: `DELETE FROM StudentSkillsInfo WHERE student_skill_id = $1`,
      values: [id],
    };
    const { rowCount } = await pool.query(query);
    return {
      success: rowCount === 1,
      message:
        rowCount === 1
          ? "Skill deleted successfully"
          : "Skill mapping not found",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Asynchronously counts the number of verified students (tutors) associated with a specific faculty.
 * This function queries the TutorInfo table to count students who have been verified and belong to
 * a given faculty.
 *
 * @param {number} id - The unique identifier of the faculty to count verified students for.
 * @returns {Promise<number>} The count of verified students associated with the specified faculty,
 *                            or 0 if an error occurs during the query execution.
 */
export const getVerifiedStudentCountByFaculty = async (id) => {
  try {
    const query = {
      text: `SELECT COUNT(*) FROM TutorInfo WHERE is_verified AND faculty_id = $1`,
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0].count;
  } catch (error) {
    return 0;
  }
};

/**
 * Asynchronously retrieves all skills for tutors who are verified. This function
 * joins the StudentSkillsInfo, TutorInfo, and SkillsInfo tables to get a list of
 * skills possessed by verified tutors, showing the diversity of skills beyond their
 * primary tutoring subjects.
 *
 * @returns {Promise<Array>} An array of objects where each object contains the tutor_id
 *                           and the skill_name they possess, or an empty array if an error occurs.
 */
export const getAllTutorOtherSkills = async () => {
  try {
    const query = {
      text: `
      SELECT ti.tutor_id, si.skill_name
      FROM StudentSkillsInfo ssi 
      JOIN TutorInfo ti
      	ON ti.student_id = ssi.student_id 
      JOIN Skillsinfo si
      	ON si.skill_id = ssi.skill_id
      WHERE ti.is_verified
      `,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return [];
  }
};
