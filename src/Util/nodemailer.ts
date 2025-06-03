import path from "path";
import { acrPasswordGeneratedMailTemplate, activeRolesPostedMailTemplate, activeRolesPostedMailTemplateCIR, adminMailTemplate, adminMailWithPhoneTemplate, cvRecivedMailTemplate, cvRecivedMailTemplateCIR, cvReviewMailTemplate, cvReviewMailTemplateCIR, generateEmailTemplateCard, generateEmailTemplateForgotPassword, generateEmailTemplateResponseEmailSend, InActiveRolesPostedMailTemplate, inviteLoginEmail, newJobAlertMailTemplate, newJobAlertMailTemplateCIR, referViaCode, uploadCVAlertMailTemplate, uploadCVAlertMailTemplateCIR } from "./mailTemplate";

const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    // host: "live.smtp.mailtrap.io",
    host: 'gmail',
    port: 587,
    auth: {
        user: "darshandumaraliya@gmail.com",
        // pass: "6032e77ba3996b3696c7b9c5b8fc8d4e"
        pass: "znoq rnha mjif undr"
    }
});

const senderMail = "darshandumaraliya@gmail.com";

export async function emailHelper(reciverEmail: string, data: any, user: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "New Card Add", // Subject line
            text: `Your password is `, // plain text body
            html: generateEmailTemplateCard(data, user), // html body
        });

    } catch (err) {
        console.log(err)
    }
}

export async function forgotEmailSend(data: any) {
    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: data.email, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Reset Your Password for SaiVen Technology Solutions Limited Account", // Subject line
            text: `reset link ${data.link}`, // plain text body
            html: generateEmailTemplateForgotPassword(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function referViaCodeEmailSend(data: any) {
    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: data.email, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: `Invitation to Join SaiVen Technology Solutions Limited - Complete Your Registration`, // Subject line
            text: `Dear ${data.newCandidateName},\n\nYou have been referred by ${data.name} to join SaiVen Technology Solutions Limited! We are excited to invite you to be part of our professional network.\n\nTo get started, please complete your registration by clicking the link below: ${data.link}\n\nOnce registered, you will gain access to opportunities in UK Public Sector Contracts and be a part of a community of professionals just like you.\n\nImportant: Please use the Referral Code – ${data.referralCode} while completing your registration.\n\nWe look forward to welcoming you!\n\nBest regards,\nHR Team\nSaiVen Technology Solutions Limited`, // plain text body
            html: referViaCode(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function inviteLoginEmailSend(data: any) {
    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: data.email, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: `Welcome to SaiVen Technology Solutions Limited - Access Your Candidate Portal`, // Subject line
            text: `Dear ${data.candidateName},\n\nThank you for registering with Us! We are excited to have you join our network of professionals.\n\nTo get started, please log in to your candidate portal: ${data.link}\n\nIf you have any questions, please feel free to reach out to me at jamie.thompson@saivensolutions.co.uk\n\nBest regards,\nJamie Thompson\nRecruitment Lead\nSaiVen Technology Solutions Limited`, // plain text body
            html: inviteLoginEmail(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function responseEmailSend(data: any) {
    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            to: ["jamie.thompson@saivensolutions.co.uk", "info@saivensolutions.co.uk"], // list of receivers
            subject: "New User Registration Alert - CIR System", // Subject line
            text: `New User Registration Name is ${data.name} and Email is ${data.email}`, // plain text body
            html: generateEmailTemplateResponseEmailSend(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}


// ACR Mail

export async function acrPasswordGeneratedMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            to: ['ayush@westgateithub.com'],
            // to: reciverEmail, // list of receivers
            // cc: data.ccEmail,
            cc: ['ayush@westgateithub.com'],
            subject: "Thank You for Registering with SaiVen ACR System", // Subject line
            text: ``, // plain text body
            html: acrPasswordGeneratedMailTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function activeRolesPostedMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Immediate Action Required: Confirm Capacity for New Active Role(s) within 2 Hours", // Subject line
            text: ``, // plain text body
            html: activeRolesPostedMailTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function newJobAlertMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "New Job Posted in the System - Action Required", // Subject line
            text: ``, // plain text body
            html: newJobAlertMailTemplate(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function uploadCVAlertMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Immediate Action Required: Upload CV(s) for Confirmed Role within 24 Hours", // Subject line
            text: ``, // plain text body
            html: uploadCVAlertMailTemplate(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function cvRecivedMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Confirmation: CVs Successfully Submitted", // Subject line
            text: ``, // plain text body
            html: cvRecivedMailTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function cvReviewMail(reciverEmail: string, data: any) {

    try {
        const attachments = data.cvUploaded.map((attachment: any) => ({
            filename: attachment.filename?.substring(attachment.filename.indexOf('_') + 1) || "",            // Name of the file to attach
            path: attachment.url, // Path to the file
        }))
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "CVs Uploaded - Vetting Process Initiation", // Subject line
            text: ``, // plain text body
            html: cvReviewMailTemplate(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
                ...attachments
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function adminMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "New User Registering with SaiVen ACR System", // Subject line
            text: ``, // plain text body
            html: adminMailTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}
export async function adminMailWithPassword(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "New User Registering with SaiVen ACR System", // Subject line
            text: ``, // plain text body
            html: adminMailWithPhoneTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function InActiveRolesPostedMail(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Notification: Inactive Job Posted in ACR System", // Subject line
            text: ``, // plain text body
            html: InActiveRolesPostedMailTemplate(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

// CIR MAIL

export async function activeRolesPostedMailCIR(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Action Required: Confirm Capacity for New Active Role", // Subject line
            text: ``, // plain text body
            html: activeRolesPostedMailTemplateCIR(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function newJobAlertMailCIR(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "New Job Posted in the CIR System - Action Required", // Subject line
            text: ``, // plain text body
            html: newJobAlertMailTemplateCIR(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function uploadCVAlertMailCIR(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Confirmation: CVs Successfully Submitted for Active Job.", // Subject line
            text: ``, // plain text body
            html: uploadCVAlertMailTemplateCIR(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function cvRecivedMailCIR(reciverEmail: string, data: any) {

    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Confirmation: CVs Successfully Submitted for Active Job.", // Subject line
            text: ``, // plain text body
            html: cvRecivedMailTemplateCIR(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

export async function cvReviewMailCIR(reciverEmail: string, data: any) {

    try {
        const attachments = data.cvUploaded.map((attachment: any) => ({
            filename: attachment.filename?.substring(attachment.filename.indexOf('_') + 1) || "",            // Name of the file to attach
            path: attachment.url, // Path to the file
        }))
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "CIR Job Applied - Vetting Process Initiation", // Subject line
            text: ``, // plain text body
            html: cvReviewMailTemplateCIR(data), // html body
            attachments: [
                {
                    filename: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    path: data?.url, // Path to the file
                },
                ...attachments
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}