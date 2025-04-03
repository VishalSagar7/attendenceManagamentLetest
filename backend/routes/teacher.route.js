import express from 'express';
import {
    teacherSignup,
    teacherLogin,
    teacherLogout,
    teacherVerification,
    insertAttendance,
    getAllStudentsList,
    getDefaulterList,
    createAnnouncement
} from '../controllers/teacher.controller.js';
import { verifyTeacher } from '../middlewares/verifyTeacher.js';
import {getAttendancePercentage} from '../controllers/student.controller.js'

const router = express.Router();

router.post('/signup', teacherSignup);
router.post('/login', teacherLogin);
router.post('/logout', teacherLogout);
router.post('/verifyteacher', verifyTeacher, teacherVerification);
router.post('/insertattendence', verifyTeacher, insertAttendance);
router.post('/getallstudents', verifyTeacher, getAllStudentsList);
router.post('/getstudentattendence/:studentId', getAttendancePercentage);
router.post('/getdefaulterlist', verifyTeacher, getDefaulterList);
router.post('/createannouncement', verifyTeacher, createAnnouncement);

export default router;
