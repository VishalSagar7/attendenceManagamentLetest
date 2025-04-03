import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateToken = (teacher,res) => {
    const token = jwt.sign(
        { id: teacher._id, role: teacher.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('teacher-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });
    return token;
};