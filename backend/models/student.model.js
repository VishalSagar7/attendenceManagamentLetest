import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    SchoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true 
    },
    rollNumber: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false 
    },
    role: {
        type: String,
        requi: true,
        default: 'student'
    },
    attendance: [
        {
            subject: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            present: {
                type: Boolean,
                required: true
            }
        }
    ]
}, { timestamps: true });



const Student = mongoose.model('Student', studentSchema);

export default Student;
