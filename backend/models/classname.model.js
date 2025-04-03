import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const classSchema = new Schema({
    className: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String], 
        default: [],
    },
    students: {
        type: [Schema.Types.ObjectId], 
        ref: 'Student', 
        default: [],
    },
    schoolId: {
        type: Schema.Types.ObjectId, 
        ref: 'School', 
        required: true,
    },
});

const Classname = model('Classname', classSchema);

export default Classname;