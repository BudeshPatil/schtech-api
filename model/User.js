import mongoose, { now } from 'mongoose';
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: false
    },
    email: {
        type : String,
        required : false 
    },
    password: {
        type : String,
        required : false 
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otpCode : {
        type : String,
        required: false
    },
    otpExpiry : {
        type : String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User',userSchema);