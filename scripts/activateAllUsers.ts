import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/Models/userModel';

// Load environment variables
dotenv.config();

const activateAllUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log('Connected to database');

        const result = await User.updateMany({}, { $set: { isActive: true } });
        console.log(`Matched ${result.matchedCount} users.`);
        console.log(`Modified ${result.modifiedCount} users.`);
    } catch (error) {
        console.error('Error activating users:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    }
};

activateAllUsers();


