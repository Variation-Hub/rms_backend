import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ACRUserModel = new mongoose.Schema({
    agencyName: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        trim: true,
        default: "",
    },
    numberOfBranchesInUK: {
        type: String,
        trim: true,
        default: "",
    },
    personName: {
        type: String,
        trim: true,
        default: "",
    },
    personDesignation: {
        type: String,
        trim: true,
        default: "",
    },
    personEmail: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    phoneNumberCountryCode: {
        type: String,
        trim: true,
        default: "",
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: "",
    },
    secondaryContectName: {
        type: String,
        trim: true,
        default: "",
    },
    secondaryDesignation: {
        type: String,
        trim: true,
        default: "",
    },
    secondaryEmail: {
        type: String,
        trim: true,
        default: "",
    },
    secondaryPhoneNumberCountryCode: {
        type: String,
        trim: true,
        default: "",
    },
    secondaryPhoneNumber: {
        type: String,
        trim: true,
        default: "",
    },
    contectTime: {
        type: String,
        trim: true,
        default: "",
    },
    password_reset: {
        type: Boolean,
        default: false
    },
    appliedRole:[
        mongoose.Schema.Types.Mixed,
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, minimize: false });

ACRUserModel.pre('save', async function (this: any, next) {
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

ACRUserModel.pre('findOneAndUpdate', async function (this: any, next) {
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

export default mongoose.model('ACRUser', ACRUserModel);