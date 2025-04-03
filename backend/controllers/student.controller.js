import bcrypt from 'bcryptjs';
import Student from '../models/student.model.js';
import jwt from 'jsonwebtoken';
import { generateTokenForStudent } from '../utils/generateStudenttoken.js';
import Announcement from '../models/announcement.model.js';
import Classname from '../models/classname.model.js';
import School from '../models/school.model.js';

export const studentSignup = async (req, res) => {
    try {

        const { name, email, className, password, rollNumber, phoneNumber, schoolname } = req.body;


        // Validate required fields
        if (!name || !email || !password || !className || !rollNumber || !phoneNumber || !schoolname) {
            return res.status(400).json({
                message: "All required fields must be filled.",
                success: false
            });
        };

        
        const schoolInfo = await School.findOne({ schoolName: schoolname });
        const classInfo = await Classname.findOne({ className: className, schoolId:schoolInfo._id });

        if (!schoolInfo) {
            return res.status(404).json({
                message: "School not found.",
                success: false
            });
        };

        if (!classInfo) {
            return res.status(404)
                .json({
                    success: true,
                    message: "Enter valid classname"
                })
        };
        
        console.log("classid", classInfo._id);
        
        console.log(schoolInfo.classesArray);
        

        if (!schoolInfo.classesArray.includes(classInfo._id)) {
            return res.status(400).json({
                message: "School does not have that class. Please enter valid classname.",
                success: false
            });
        };
        




        // Check if the email is already registered
        const existingEmail = await Student.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already registered.",
                success: false
            });
        }

        // Check if the roll number is already registered for the specific class
        const existingRollNo = await Student.findOne({ className, rollNumber, SchoolId : schoolInfo._id });
        if (existingRollNo) {
            return res
                .status(400)
                .json({
                    message: `Roll number ${rollNumber} is already registered in class ${className}.`,
                    success: false
                });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student document
        const newStudent = new Student({
            SchoolId : schoolInfo._id,
            name,
            email,
            password: hashedPassword,
            className,
            rollNumber,
            phoneNumber
        });


        await newStudent.save();


        res.status(201).json({
            message: "Student registered successfully.",
            success: true,
            student: {
                id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                class: newStudent.class,
                rollNumber: newStudent.rollNumber
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error during student registration.",
            success: false,
            error: error.message
        });
    }
};

export const studentLogin = async (req, res) => {
    try {

        const { email, password, schoolname } = req.body;
        

        // Validate required fields
        if (!email || !password || !schoolname) {
            return res.status(400).json({
                message: "Email and password are required.",
                success: false,
            });
        };

        // Check if the student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res
                .status(404)
                .json({
                    message: "Student not found. Please sign up first.",
                    success: false,
                });
        };

        const schoolInfo = await School.findOne({ schoolName: schoolname });
        
        if (!schoolInfo) {
            return res
                .status(404)
                .json({
                    message: "Schooln not found.",
                    success: false,
                });
        };

        
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({
                    message: "Invalid email or password.",
                    success: false,
                });
        }

        

        if (student.SchoolId.toString() !== schoolInfo._id.toString()) {
            return res
                .status(401)
                .json({
                    message: "Student not belongs to this school.",
                    success: false,
                });
        }

        // Generate a token
        generateTokenForStudent(student, res);

        // Respond with the token and student details
        res.status(200).json({
            message: "Login successful.",
            success: true,
            schollDetails: schoolInfo,
            student: {
                id: student._id,
                name: student.name,
                phoneNumber: student.phoneNumber,
                email: student.email,
                className: student.className,
                rollNumber: student.rollNumber,
                createdAt: student.createdAt,
                schoolInfo
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error during student login.",
            success: false,
            error: error.message,
        });
    }
};


export const studentLogout = async (req, res) => {
    try {
        // Clear the cookie containing the JWT token
        res.clearCookie("student-token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure flag only in production
            sameSite: "none", // Adjust as per frontend/backend setup
        });

        res.status(200).json({
            message: "Logout successful.",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error during logout.",
            success: false,
            error: error.message,
        });
    }
};


export const studentVerification = async (req, res) => {
    try {
        const student = req.student;

        return res
            .status(200)
            .json({
                success: true,
                message: "student verified successfully.",
                student
            });

    } catch (error) {
        res.status(401).json({
            message: "Error in studentVerification middleware.",
            error: error.message,
            success: false
        });
    }
};



export const getAttendancePercentage = async (req, res) => {
    try {
        const { studentId } = req.params;


        const student = await Student.findById(studentId).populate('SchoolId').select('-password');

        
        
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                success: false,
            });
        }

        // Group attendance by subject
        const attendanceBySubject = student.attendance.reduce((acc, record) => {
            const { subject, present } = record;

            if (!acc[subject]) {
                acc[subject] = { totalLectures: 0, attendedLectures: 0 };
            }

            acc[subject].totalLectures += 1; // Increment total lectures taken
            if (present) acc[subject].attendedLectures += 1; // Increment attended lectures

            return acc;
        }, {});




        const subjectAttendance = Object.keys(attendanceBySubject).map(subject => {
            const { totalLectures, attendedLectures } = attendanceBySubject[subject];
            const percentage = (attendedLectures / totalLectures) * 100;

            return {
                subject,
                totalLectures,
                attendedLectures,
                attendancePercentage: `${percentage.toFixed(2)}%`,
            };
        });

        // Calculate overall attendance
        const totalLectures = student.attendance.length;
        const attendedLectures = student.attendance.filter(record => record.present).length;
        const overallPercentage = totalLectures ? (attendedLectures / totalLectures) * 100 : 0;

        // Return the results
        return res.status(200).json({
            success: true,
            student,
            subjectWiseAttendance: subjectAttendance,
            overallAttendance: {
                totalLectures,
                attendedLectures,
                percentage: `${overallPercentage.toFixed(2)}%`
            }
        });
    } catch (error) {
        console.error("Error calculating attendance:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const getStudentAnnouncement = async (req, res) => {
    try {
        const { className, schoolId } = req.body;

      

        if (!className) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Please provide a classname."
                });
        }
        const announcements = await Announcement.find({ createdForClass: className, createdForSchool:schoolId }).populate({ path: 'createdBy', select: '-password' });

 
        
        if (announcements.length === 0) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "No announcements for your class."
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Announcements fetched.",
                announcements: announcements
            })


    } catch (error) {
        console.error("Error in getStudentAnnouncement controller", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

