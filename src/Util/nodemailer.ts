import path from "path";
import { acrPasswordGeneratedMailTemplate, activeRolesPostedMailTemplate, cvRecivedMailTemplate, cvReviewMailTemplate, generateEmailTemplateCard, generateEmailTemplateForgotPassword, generateEmailTemplateResponseEmailSend, inviteLoginEmail, newJobAlertMailTemplate, referViaCode, uploadCVAlertMailTemplate } from "./mailTemplate";

const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "6032e77ba3996b3696c7b9c5b8fc8d4e"
    }
});


export async function emailHelper(reciverEmail: string, data: any, user: any) {

    try {
        await transporter.sendMail({
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: data.email, // list of receivers
            subject: "Reset Your Password for Saiven Technology Solutions Account", // Subject line
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: data.email, // list of receivers
            subject: `Invitation to Join Saiven Technology Solutions - Complete Your Registration`, // Subject line
            text: `Dear ${data.newCandidateName},\n\nYou have been referred by ${data.name} to join Saiven Technology Solutions! We are excited to invite you to be part of our professional network.\n\nTo get started, please complete your registration by clicking the link below: ${data.link}\n\nOnce registered, you will gain access to opportunities in UK Public Sector Contracts and be a part of a community of professionals just like you.\n\nImportant: Please use the Referral Code – ${data.referralCode} while completing your registration.\n\nWe look forward to welcoming you!\n\nBest regards,\nHR Team\nSaiven Technology Solutions`, // plain text body
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: data.email, // list of receivers
            subject: `Welcome to Saiven Technology Solutions - Access Your Candidate Portal`, // Subject line
            text: `Dear ${data.candidateName},\n\nThank you for registering with Us! We are excited to have you join our network of professionals.\n\nTo get started, please log in to your candidate portal: ${data.link}\n\nIf you have any questions, please feel free to reach out to me at jamie.thompson@saivensolutions.co.uk.\n\nBest regards,\nJamie Thompson\nRecruitment Lead\nSaiven Technology Solutions`, // plain text body
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
            from: 'info@saivensolutions.co.uk', // sender address
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
            subject: "New Job Posted in the System - Action Required", // Subject line
            text: ``, // plain text body
            html: newJobAlertMailTemplate(data), // html body
            attachments: [
                {
                    filename: 'Read me.docx',            // Name of the file to attach
                    path: path.join(__dirname, 'readme.docx'), // Path to the file
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
            subject: "Immediate Action Required: Upload CV(s) for Confirmed Role within 24 Hours", // Subject line
            text: ``, // plain text body
            html: uploadCVAlertMailTemplate(data), // html body
            attachments: [
                {
                    filename: 'Read me_Jobtitle_JobCode.docx',            // Name of the file to attach
                    path: path.join(__dirname, 'readme.docx'), // Path to the file
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
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
            subject: "Confirmation: CV(s) Successfully Submitted", // Subject line
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
        await transporter.sendMail({
            from: 'info@saivensolutions.co.uk', // sender address
            to: reciverEmail, // list of receivers
            subject: "CVs Uploaded – Vetting Process Initiation", // Subject line
            text: ``, // plain text body
            html: cvReviewMailTemplate(data), // html body
            attachments: [
                {
                    filename: 'Read me.docx',            // Name of the file to attach
                    path: path.join(__dirname, 'readme.docx'), // Path to the file
                },
            ],
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}