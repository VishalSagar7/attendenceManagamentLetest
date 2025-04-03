import express from 'express';
import { studentSignup } from '../controllers/student.controller.js';
import { studentLogin, studentLogout, studentVerification, getAttendancePercentage } from '../controllers/student.controller.js';
import { verifyStudent } from '../middlewares/verifyStudent.js';
import { getStudentAnnouncement } from '../controllers/student.controller.js';

const router = express.Router();


router.post('/signup', studentSignup);
router.post('/login', studentLogin);
router.get('/logout', studentLogout);
router.post('/verifystudent', verifyStudent, studentVerification);
router.post('/getstudentattendence/:studentId', verifyStudent, getAttendancePercentage);
router.post('/getstudentannouncement', verifyStudent, getStudentAnnouncement);


export default router;