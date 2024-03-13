import validator from 'validator'
import { registerFaculty, validateFacultyLoginDetails } from '../modules/authModule.js';
export const handleFacultyRegister = async (req, res) => {
    try {

        const { fullName, email, password, courseId, branchId } = req.body;

        // Validate name
        if(!validator.isAlpha(fullName)) return res.status(400).json({
            success: false,
            message: "Name can only contain letters"
        })
        // Validate email
        if (!validator.isEmail(email)) return res.status(400).json({
            success: false,
            message: "Email address is not valid"
        })
        // Validate password
        if(!validator.isStrongPassword(password)) return res.status(400).json({
            success: false,
            message: "Please use a strong alphanumeric password"
        })
        // Vaidate course and branch ids
        if(!validator.isInt(courseId)) return res.status(400).json({
            success: false,
            message: "Course Id missing"
        })
        
        if (!validator.isInt(branchId)) return res.status(400).json({
            success: false,
            message: "Branch Id missing"
        })

        const result = await registerFaculty(fullName, email, password, courseId, branchId)

        const statusCode = result.success ? 201 : 400
        res.status(statusCode).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

export const handleFacultyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

         // Validate email
        if (!validator.isEmail(email)) return res.status(400).json({
            success: false,
            message: "Email address is not valid"
        })

        const result = await validateFacultyLoginDetails(email, password);

        const statusCode = result.success ? 201 : 400
        res.status(statusCode).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}