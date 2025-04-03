import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required : true
    },
    createdForSchool: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    createdForClass: {
        type: String,
        required : true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;