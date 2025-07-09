import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please enter username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Please enter email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Please enter password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpire:{
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpire:{
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpire:{
        type: Date,
    },

})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;