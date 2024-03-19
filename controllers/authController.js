import validator from "validator";
import { genereateToken } from "../middlewares/jwt.js";
import {
  registerFaculty,
  registerStudent,
  validateFacultyLoginDetails,
  validateStudentLoginDetails,
} from "../modules/authModule.js";
export const handleFacultyRegister = async (req, res) => {
  try {
    const { fullName, email, password, courseId, branchId } = req.body;

    // Validate name
    if (!validator.isAlpha(fullName.replace(/\s/g, "")))
      return res.status(400).json({
        success: false,
        message: "Name can only contain letters",
      });
    // Validate email
    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Email address is not valid",
      });
    // Validate password
    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        success: false,
        message: "Please use a strong alphanumeric password",
      });
    // Vaidate course and branch ids
    if (!validator.isInt(courseId))
      return res.status(400).json({
        success: false,
        message: "Course Id missing",
      });

    if (!validator.isInt(branchId))
      return res.status(400).json({
        success: false,
        message: "Branch Id missing",
      });

    const result = await registerFaculty(
      fullName,
      email,
      password,
      courseId,
      branchId
    );

    const statusCode = result.success ? 201 : 400;
    res.status(statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const handleFacultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Email address is not valid",
      });

    const result = await validateFacultyLoginDetails(email, password);

    const statusCode = result.success ? 200 : 401;

    let responseObject = {
      success: result.success,
      message: result.message,
    };

    let token;
    //   Check if login was a success or not
    if (result.success) {
      // Generate a token
      const userObject = {
        userId: result.data[0].faculty_id,
        username: result.data[0].faculty_full_name,
        role: "faculty",
      };
      token = await genereateToken(userObject);
      // If token generation is successful add token to response object
      if (token.succes) {
        responseObject = {
          ...responseObject,
          token: token.token,
        };
        res.cookie("token", token?.token, {
          maxAge: 900000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "prod",
        });
        return res.status(statusCode).json(responseObject);
      }
    }
    //   If unauthorized send appropriate response
    return res.status(statusCode).json(responseObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const handleStudentRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      gender,
      courseId,
      branchId,
      semesterId,
      phone,
      dob,
      enrollment,
    } = req.body;

    // Validate name
    if (!validator.isAlpha(fullName.replace(/\s/g, "")))
      return res.status(400).json({
        success: false,
        message: "Name can only contain letters between [A-Za-z]",
      });
    // Validate email
    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Email address is not valid",
      });
    // Validate password
    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        success: false,
        message: "Please use a strong alphanumeric password",
      });
    // Validate course id
    if (!validator.isInt(courseId))
      return res.status(400).json({
        success: false,
        message: "Course Id missing",
      });

    // Validate branch id
    if (!validator.isInt(branchId))
      return res.status(400).json({
        success: false,
        message: "Branch Id missing",
      });

    // Validate semester id
    if (!validator.isInt(semesterId))
      return res.status(400).json({
        success: false,
        message: "Semester Id missing",
      });

    if (!validator.isNumeric(enrollment))
      return res.status(400).json({
        success: false,
        message: "Invalid PRN/enrollment, only digits are allowed",
      });

    // Validate phone number
    if (!validator.isMobilePhone(phone, "en-IN"))
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10 digit phone number",
      });

    // Validate DOB
    if (!validator.isDate(dob))
      return res.status(400).json({
        success: false,
        message: "Invalid DOB parsed",
      });

    const result = await registerStudent(
      fullName,
      email,
      password,
      gender,
      courseId,
      branchId,
      semesterId,
      phone,
      dob,
      enrollment
    );

    const statusCode = result.success ? 201 : 400;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const handleStudentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Email address is not valid",
      });

    const result = await validateStudentLoginDetails(email, password);
    const statusCode = result.success ? 200 : 401;

    let responseObject = {
      success: result.success,
      message: result.message,
    };

    let token;
    //   Check if login was a success or not
    if (result.success) {
      // Generate a token
      const userObject = {
        userId: result.data[0].student_id,
        username: result.data[0].student_full_name,
        role: "student",
      };
      token = await genereateToken(userObject);
      // If token generation is successful add token to response object
      if (token.succes) {
        responseObject = {
          ...responseObject,
          token: token.token,
        };
        res.cookie("token", token?.token, {
          maxAge: 1200000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "prod",
        });
        return res.status(statusCode).json(responseObject);
      }
    }
    //   If unauthorized send appropriate response
    return res.status(statusCode).json(responseObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const handleUserLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
