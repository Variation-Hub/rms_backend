import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModelDatabase = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default : 'DATA_BASE_USER'
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, minimize: false });

userModelDatabase.pre('save', async function (this: any, next) {
    this.updatedAt = new Date();

    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.email = this.email?.toLowerCase();
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});

export default mongoose.model('UserDatabase', userModelDatabase);