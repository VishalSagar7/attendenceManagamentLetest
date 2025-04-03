import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/student.model.js";

dotenv.config();

export const verifyStudent = async (req, res, next) => {
    try {
    
        const token = req.cookies["student-token"];


        if (!token) {
            return res.status(401).json({
                message: "No token provided.",
                success: false,
            });
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        const student = await Student.findById(decoded.id).select('-password');
        
        console.log(student);
        

        if (!student) {
            return res.status(404).json({
                message: "Student not found.",
                success: false,
            });
        }

        
        if (student.role && student.role !== "student") {
            return res.status(403).json({
                message: "Access denied. Only students are allowed.",
                success: false,
            });
        }

        req.student = student;
        next();
    } catch (error) {
       
        res.status(401).json({
            message: "Error in verifyStudent middleware.",
            error: error.message,
            success: false,
        });
    }
};
