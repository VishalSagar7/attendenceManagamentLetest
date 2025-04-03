import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import Student from "../models/student.model.js";
import dotenv from "dotenv";
import Classname from "../models/classname.model.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const seedStudents = async () => {
    try {
        const className = "5A";
        const schoolid = "67b469e8f6ad4d204cb0ff21"
        const classDoc = await Classname.findOne({ className: className, schoolId: schoolid });

        if (!classDoc) {
            console.error(`Class "${className}" not found.`);
            return;
        }

        const students = [];
        const password = "123456";
        const hashedPassword = await bcrypt.hash(password, 10);

        for (let i = 1; i <= 40; i++) {
            students.push({
                SchoolId: new mongoose.Types.ObjectId("67b469e8f6ad4d204cb0ff21"),
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: hashedPassword,
                className,
                rollNumber: i,
                phoneNumber: faker.phone.number("98########"),
            });
        }

        const insertedStudents = await Student.insertMany(students);
        console.log("40 students inserted successfully!");

        // Add student IDs to Classname.students array and save
        classDoc.students.push(...insertedStudents.map(student => student._id));
        await classDoc.save();

        console.log("Student IDs added to the class document!");
    } catch (error) {
        console.error("Error inserting students:", error.message);
    }
};
