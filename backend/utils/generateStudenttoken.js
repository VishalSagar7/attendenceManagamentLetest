import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateTokenForStudent = (student,res) => {
    const token = jwt.sign(
        { id: student._id, role: student.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('student-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });
    return token;
};