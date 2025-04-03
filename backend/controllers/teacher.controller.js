import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Teacher from '../models/teacher.model.js';
import { generateToken } from '../utils/generateTeacherToken.js';
import Student from '../models/student.model.js';
import Attendance from '../models/attendence.model.js';
import Announcement from '../models/announcement.model.js';
import Classname from '../models/classname.model.js';
import School from '../models/school.model.js';
import mongoose from 'mongoose';

dotenv.config();

export const teacherSignup = async (req, res) => {
    try {
        const { name, email, password, schoolName } = req.body;

        // Validate required fields
        if (!name || !email || !password || !schoolName) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });
        }

        // Fetch existing teacher and school details in parallel
        const [existingUser, schoolDetails] = await Promise.all([
            Teacher.findOne({ email }),
            School.findOne({ schoolName }),
        ]);


        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use.",
            });
        }

        // Check if the school exists
        if (!schoolDetails) {
            return res.status(404).json({
                success: false,
                message: "School not found.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new teacher
        const newTeacher = new Teacher({
            schoolId: new mongoose.Types.ObjectId(schoolDetails._id),
            name,
            email,
            password: hashedPassword,
            role: "teacher",
        });


        await newTeacher.save();

        // Add teacher to school's teacher array and save
        schoolDetails.teachersArray.push(newTeacher._id);
        await schoolDetails.save();

        // Success response
        res.status(201).json({
            success: true,
            message: "Teacher registered successfully",
            teacher: {
                id: newTeacher._id,
                name: newTeacher.name,
                email: newTeacher.email,
                role: newTeacher.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};




// Teacher login function
export const teacherLogin = async (req, res) => {
    try {

        const { email, password, schoolname } = req.body;


        const schollDetails = await School.findOne({ schoolName: schoolname })

        if (!schollDetails) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'School not found.'
                });
        }


        if (!email || !password || !schoolname) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Fill all the fields.'
                });
        };
        // Check if teacher exists
        const teacher = await Teacher.findOne({ email, role: 'teacher' }).populate('schoolId');
        if (!teacher) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Invalid email or password.'
                });
        }

        if (schollDetails.teachersArray.includes(teacher?._id) === false) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Teacher does not belong to this school.'
                });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Invalid email or password.'
                });
        }

        // Generate JWT token
        generateToken(teacher, res)


        res
            .status(200)
            .json({
                success: true,
                message: 'Login successful.',
                schollDetails,
                teacher
            });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const teacherLogout = (req, res) => {
    try {

        res.cookie('teacher-token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            error: error.message
        });
    }
};


export const teacherVerification = async (req, res) => {
    try {
        const teacher = req.teacher;

        return res
            .status(200)
            .json({
                success: true,
                message: "Teacher verified successfully.",
                teacher
            });

    } catch (error) {
        res.status(401).json({
            message: "Error in teacherVerification middleware.",
            error: error.message,
            success: false
        });
    }
};


export const insertAttendance = async (req, res) => {
    try {

        const { subject, date, studentsData, teacherId } = req.body;



        // Loop through the students and update their attendance records
        for (const studentDetail of studentsData) {
            const { studentId, present } = studentDetail;

            // Update the attendance in the Student model
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({
                    message: `Student with ID ${studentId} not found.`,
                    success: false
                });
            }

            // Add attendance record to the student's attendance array
            student.attendance.push({
                subject,
                date,
                present
            });

            await student.save();
        }

        // const existingAttendence = await Attendance.findOne({ subject, date })

        // if (existingAttendence) {
        //     return res.status(404).json({
        //         message: `.`,
        //         success: false
        //     });
        // }

        const attendance = new Attendance({
            teacherId,
            subject,
            date,
            studentsData
        });

        await attendance.save();

        res.status(200).json({
            message: "Attendance recorded successfully.",
            success: true
        });



    } catch (error) {
        res.status(500).json({
            message: "Error recording attendance.",
            error: error.message,
            success: false
        });
    }
};


export const getAllStudentsList = async (req, res) => {
    try {

        const { className, schoolId } = req.body;

       
        if (!className || !schoolId) {
            return res.status(400).json({
                success: false,
                message: "Please provide both className and schoolId.",
            });
        }

        // Fetch class details with subjects and _id
        const classDetails = await Classname.findOne({ className, schoolId: schoolId }).select('subjects _id');
        if (!classDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid className.",
            });
        }

        // Fetch school details and validate class association
        const schoolDetails = await School.findById(schoolId).select('classesArray');
        if (!schoolDetails || !schoolDetails.classesArray.includes(classDetails._id)) {
            return res.status(403).json({
                success: false,
                message: "This class is not associated with your school.",
            });
        }

        // Fetch students
        const allStudents = await Student.find({ className, SchoolId: schoolId })
            .select('-password -attendance')
            .sort({ rollNumber: 1 });

        res.status(200).json({
            success: true,
            allStudents,
            classSubjects: classDetails.subjects,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching student list.",
            error: error.message,
        });
    }
};





export const getDefaulterList = async (req, res) => {
    try {
        const { className, schoolId } = req.body;

        console.log(schoolId);
        

        if (!className) {
            return res.status(400).json({
                message: "Class name is required",
                success: false,
            });
        }

        // Fetch students of the given class
        const students = await Student.find({ className, SchoolId:schoolId }).select("-password");

        if (students.length === 0) {
            return res.status(404).json({
                message: "No students found for this class",
                success: false,
            });
        }

        // Filter students with attendance < 75%
        const defaulters = students
            .map(student => {
                const totalLectures = student.attendance.length;
                const attendedLectures = student.attendance.filter(record => record.present).length;
                const percentage = totalLectures ? (attendedLectures / totalLectures) * 100 : 0;

                return {
                    name: student.name,
                    phoneNumber: student.phoneNumber,
                    email: student.email,
                    rollNumber: student.rollNumber,
                    className: student.className,
                    _id: student._id,
                    totalLectures,
                    attendedLectures,
                    percentage: `${percentage.toFixed(2)}%`
                };
            })
            .filter(student => parseFloat(student.percentage) < 75);

        return res.status(200).json({
            success: true,
            totalDefaulters: defaulters.length,
            defaulters
        });

    } catch (error) {
        console.error("Error fetching defaulter list:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};



export const createAnnouncement = async (req, res) => {
    try {
        // Extract data from the request body
        const { teacherId, content, className, schoolId } = req.body;

       
        if (!teacherId || !content || !className) {
            return res.status(400).json({
                message: "All fields (teacherId, content, className) are required",
                success: false,
            });
        }

        const classInfo = await Classname.findOne({ className: className, schoolId: schoolId });

        if (!classInfo) {
            return res.status(400).json({
                message: "Enter valid classname",
                success: false,
            });
        }


        const newAnnouncement = new Announcement({
            createdBy: teacherId,
            createdForClass: className,
            createdForSchool : schoolId,
            content: content,
        });


        const savedAnnouncement = await newAnnouncement.save();

        res.status(201).json({
            message: "Announcement created successfully",
            success: true,
            data: savedAnnouncement,
        });

    } catch (error) {
        console.error("Error in createAnnouncement controller:", error.message);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};




