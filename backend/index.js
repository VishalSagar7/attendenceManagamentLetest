import express from 'express';
import dotenv from 'dotenv';
import teacherRoute from './routes/teacher.route.js';
import studentRoute from './routes/student.route.js';
import schoolRoute from './routes/school.route.js';
import { connectToDB } from './utils/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import Student from './models/student.model.js';
import { seedStudents } from './utils/seeder.js';
import path from 'path';

const __dirname = path.resolve();


async function insertSchoolId() {
    const students = await Student.find({});
    
    for (const std of students) {
        std.SchoolId = "67aee979d823fe2f8ab6a864";
        await std.save();
    }
    
}

const app = express();
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;


// app.get('/', (req, res) => {
//     res.json({
//         message: "started listning"
//     });
// });

app.use('/api/teacher', teacherRoute);
app.use('/api/student', studentRoute);
app.use('/api/school', schoolRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


app.listen(process.env.PORT, () => {
    console.log(`server is started listening on ${PORT}`);
    connectToDB();
   
   

});