import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    studentsData: [ 
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            present: {
                type: Boolean,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
