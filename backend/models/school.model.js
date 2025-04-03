import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
        unique: true,
    },
    schoolEmail: {
        type: String,
        required: true,
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'], 
    },
    password: {
        type: String,
        required : true
    },
    teachersArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    }],
    classesArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);

export default School;