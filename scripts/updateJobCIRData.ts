import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobCIR from '../src/Models/JobModelCIR';

// Load environment variables
dotenv.config();

const updateJobs = async () => {
  try {
    // Connect to MongoDB using the same connection string as the main app
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to database');

    // Replace with your actual project ID
    const projectId = new mongoose.Types.ObjectId("68e60a25914451f25c88cb0e");

    // Update jobs with specific job_ids
    const result = await JobCIR.updateMany(
      { job_id: { $in: ["JD048", "JD049", "JD050", "JD051", "JD052", "JD053", "JD054", "JD055", "JD056", "JD057", "JD058", "JD059", "JD060", "JD061", "JD062", "JD063", "JD064", "JD065", "JD066", "JD067", "JD068", "JD069", "JD070", "JD071"] } },
      { $set: { project_id: projectId } }
    );

    console.log(`${result.modifiedCount} jobs updated.`);
    console.log(`Matched ${result.matchedCount} jobs.`);

  } catch (error) {
    console.error('Error updating jobs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

// Run the update function
updateJobs();


// Scottish Government == 68e60da2914451f25c88cb4b
// {
//   "job_id": { "$in": ["JD001", "JD002", "JD003", "JD004", "JD005", "JD006", "JD007", "JD008", "JD009", "JD010", "JD011", "JD012", "JD013", "JD014", "JD015", "JD016"] }

  
// }

// Home Office  == 68e60b74914451f25c88cb19
// {
//   "job_id": { "$in": ["JD024", "JD025", "JD026", "JD027", "JD028", "JD029", "JD030", "JD031", "JD032", "JD033", "JD034", "JD035", "JD036", "JD037", "JD038", "JD039", "JD040", "JD041", "JD042", "JD043", "JD044", "JD045", "JD046", "JD047"] }
// }

// HM Passport Office (HMPO) == 68e60a25914451f25c88cb0e
// {
//   "job_id": { "$in": ["JD048", "JD049", "JD050", "JD051", "JD052", "JD053", "JD054", "JD055", "JD056", "JD057", "JD058", "JD059", "JD060", "JD061", "JD062", "JD063", "JD064", "JD065", "JD066", "JD067", "JD068", "JD069", "JD070", "JD071"] }
// }
