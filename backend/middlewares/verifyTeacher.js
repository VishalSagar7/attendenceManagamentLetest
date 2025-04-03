import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Teacher from '../models/teacher.model.js';

dotenv.config();

export const verifyTeacher = async (req, res, next) => {
    try {
        
        const token = req.cookies['teacher-token'];

        if (!token) {
            return res.status(401).json({
                message: "No token provided.",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the teacher by decoded ID
        const teacher = await Teacher.findById(decoded.id).select('-password');

        if (!teacher) {
            return res.status(404).json({
                message: "teacher not found.",
                success: false
            });
        }

       
        if (teacher.role !== 'teacher') {
            return res.status(403).json({
                message: "Access denied. Only teachers are allowed.",
                success: false
            });
        }

        req.teacher = teacher;  
        next();  

    } catch (error) {
        res.status(401).json({
            message: "Error in verifyTeacher middleware.",
            error: error.message,
            success: false
        });
    }
};


