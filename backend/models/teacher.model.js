import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            required: true,
        },
        class: {
            type: String,
            required: function () {
                return this.role === 'student';
            },
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
