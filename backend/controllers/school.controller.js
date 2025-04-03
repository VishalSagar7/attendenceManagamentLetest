import bcrypt from 'bcryptjs'
import School from '../models/school.model.js';
import Classname from '../models/classname.model.js';

export const createSchool = async (req, res) => {

    const { schoolName, schoolEmail, password} = req.body;

    try {

        if (!schoolName || !schoolEmail || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }


        const existingSchool = await School.findOne({ schoolEmail });
        if (existingSchool) {
            return res.status(400).json({ success: false, message: 'School with this email already exists.' });
        }


        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        
        const newSchool = new School({
            schoolName,
            schoolEmail,
            password: encryptedPassword,
        });


        const savedSchool = await newSchool.save();


        res.status(201).json({
            success: true,
            message: 'School created successfully!',
            school: savedSchool,
        });

    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



export const createClass = async (req, res) => {

    const { className, subjects, students, schoolId } = req.body;

    try {
        // Validate required fields
        if (!className || !schoolId) {
            return res.status(400).json({ success: false, message: 'Class name and school ID are required.' });
        }

        // Check if the school exists
        const school = await School.findById(schoolId);
        if (!school) {
            return res.status(400).json({ success: false, message: 'Invalid school ID.' });
        }

        // Check for duplicate class in the same school
        const existingClass = await Classname.findOne({ className, schoolId });
        if (existingClass) {
            return res.status(400).json({ success: false, message: 'Class with this name already exists in the school.' });
        }

        // Create a new class
        const newClass = new Classname({
            className,
            subjects: subjects || [],
            students: students || [],
            schoolId, 
        });

        // Save the new class to the database
        const savedClass = await newClass.save();

        // Update the school's classesArray with the new class ID
        school.classesArray.push(savedClass._id);
        await school.save();

        // Return the created class
        res.status(201).json({
            success: true,
            message: 'Class created successfully!',
            class: savedClass,
        });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export const getAllSchools = async (req, res) => {
    try {

        const schools = await School.find({});
        res.status(200)
            .json({
                success: true,
                schools
            })
        
    } catch (error) {
        console.error('Error in getAllSchools:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    
};