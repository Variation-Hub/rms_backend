import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    countrycode: {
        type: String,
        trim: true,
        default: "",
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: "",
    },
    nationality: {
        type: String,
        trim: true,
        default: "",
    },
    UKDrivinglicense: {
        type: String,
        default: ""
    },
    UKVisaType: {
        type: String,
        default: ""
    },
    callDay: {
        type: String,
        trim: true,
        default: "",
    },
    callTime: {
        type: String,
        trim: true,
        default: "",
    },
    expectedDayRate: {
        type: String,
        trim: true,
        default: "",
    },
    referredBy: {
        type: String,
        trim: true,
        default: "",
    },
    currentWork: {
        type: String,
        trim: true,
        default: "",
    },
    lookingFor: {
        type: [String],
        default: [],
    },
    workLocation: {
        type: String,
        trim: true,
        default: "",
    },
    cv: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    currency: {
        type: String,
        trim: true,
        default: "",
    },
    country: {
        type: String,
        trim: true,
        default: "",
    },
    city: {
        type: String,
        trim: true,
        default: "",
    },
    postalCode: {
        type: String,
        trim: true,
        default: "",
    },
    anyQuestion:{
        type: String,
        trim: true,
        default: "",
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

userModel.pre('save', async function (this: any, next) {
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

userModel.pre('findOneAndUpdate', async function (this: any, next) {
    const update = this.getUpdate();

    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(update.password, salt);
            this.setUpdate({ ...update, password: hashedPassword });

            this.email = this.email?.toLowerCase();

            next();
        } catch (error: any) {
            next(error);
        }
    } else {
        this.setUpdate({ ...update, updatedAt: new Date() });
        next();
    }
});

export default mongoose.model('User', userModel);