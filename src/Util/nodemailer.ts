import path from "path";
import { acrPasswordGeneratedMailTemplate, activeRolesPostedMailTemplate, activeRolesPostedMailTemplateCIR, adminMailTemplate, adminMailWithPhoneTemplate, cvRecivedMailTemplate, cvRecivedMailTemplateCIR, cvReviewMailTemplate, cvReviewMailTemplateCIR, generateEmailTemplateCard, generateEmailTemplateForgotPassword, generateEmailTemplateResponseEmailSend, InActiveRolesPostedMailTemplate, inviteLoginEmail, newJobAlertMailTemplate, newJobAlertMailTemplateCIR, referViaCode, uploadCVAlertMailTemplate, uploadCVAlertMailTemplateCIR } from "./mailTemplate";

const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    // host: "live.smtp.mailtrap.io",
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: "darshandumaraliya@gmail.com",
        // pass: "6032e77ba3996b3696c7b9c5b8fc8d4e"
        pass: "znoq rnha mjif undr"
    }
});


// export const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     port: 587,
//     secure: false, // Use TLS (not SSL)
//     auth: {
//         user: 'info@saivensolutions.co.uk',
//         pass: 'Swindon@99'
//     }
// });

transporter.verify((error: any, success: any) => {
    if (error) {
        console.log('SMTP Error:', error);
    } else {
        console.log('Server is ready to take messages');
    }
});

const senderMail = "darshandumaraliya@gmail.com";

// ================================= New code ====================================================

const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

// Initialize Graph Client
const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
);

const graphClient = Client.initWithMiddleware({
    authProvider: {
        getAccessToken: async () => {
            const token = await credential.getToken('https://graph.microsoft.com/.default');
            return token?.token;
        },
    },
});

/**
 * Sends email using Microsoft Graph API
 */
async function sendResetPasswordEmail(to: string[] | string, htmlBody: any, subject: any) {
    const recipients = Array.isArray(to)
        ? to.map(email => ({ emailAddress: { address: email } }))
        : [{ emailAddress: { address: to } }];

    const message = {
        message: {
            subject,
            body: {
                contentType: 'HTML',
                content: htmlBody,
            },
            toRecipients: recipients,
            from: {
                emailAddress: {
                    address: senderMail,
                },
            },
        },
        saveToSentItems: 'false',
    };

    try {
        await graphClient
            .api(`/users/${senderMail}/sendMail`)
            .post(message);
        console.log(`Graph Email sent to: ${Array.isArray(to) ? to.join(', ') : to}`);
    } catch (error) {
        console.error('Failed to send mail via Microsoft Graph:', error);
        throw new Error('Graph Email sending failed');
    }
}

/**
 * Your custom email helper (was previously Nodemailer based)
 */
export async function emailHelper(reciverEmail: string, data: any, user: any) {
    try {
        const subject = 'New Card Add';
        const htmlBody = generateEmailTemplateCard(data, user);

        await sendResetPasswordEmail(reciverEmail, htmlBody, subject);
    } catch (err) {
        console.error('Graph API mail error:', err);
    }
}



// export async function emailHelper(reciverEmail: string, data: any, user: any) {

//     try {
//         await transporter.sendMail({
//             // from: 'info@saivensolutions.co.uk', // sender address
//             from: senderMail,
//             // to: reciverEmail, // list of receivers
//             to: ['ayush@westgateithub.com'],
//             subject: "New Card Add", // Subject line
//             text: `Your password is `, // plain text body
//             html: generateEmailTemplateCard(data, user), // html body
//         });

//     } catch (err) {
//         console.log(err)
//     }
// }

// Converted function using Microsoft Graph API
export async function forgotEmailSend(data: any) {
    try {
        console.log("data.email", data.email);

        const subject = "Reset Your Password for SaiVen Technology Solutions Limited Account";
        const htmlBody = generateEmailTemplateForgotPassword(data);

        await sendResetPasswordEmail(data.email, htmlBody, subject);

        console.log("=========== sent using Graph API =======================");
        return true;

    } catch (err) {
        console.log("=========== Graph send error ======================= ", err);
        return false;
    }
}

// export async function forgotEmailSend(data: any) {
//     try {
//         console.log("data.email", data.email);
//         await transporter.sendMail({
//             // from: 'info@saivensolutions.co.uk', // sender address
//             from: senderMail,
//             to: data.email, // list of receivers
//             // to: ['ayush@westgateithub.com'],
//             subject: "Reset Your Password for SaiVen Technology Solutions Limited Account", // Subject line
//             text: `reset link ${data.link}`, // plain text body
//             html: generateEmailTemplateForgotPassword(data), // html body
//         });

//         console.log("=========== sended working fine =======================");

//         return true;

//     } catch (err) {
//         console.log("=========== err ======================= ", err);
//         return false;
//     }
// }


// Final converted function
export async function referViaCodeEmailSend(data: any) {
    try {
        const subject = `Invitation to Join SaiVen Technology Solutions Limited - Complete Your Registration`;
        const htmlBody = referViaCode(data);

        await sendResetPasswordEmail(data.email, htmlBody, subject);

        console.log("Referral email sent to:", data.email);
        return true;
    } catch (err) {
        console.error("Error sending referral email:", err);
        return false;
    }
}

// export async function referViaCodeEmailSend(data: any) {
//     try {
//         await transporter.sendMail({
//             // from: 'info@saivensolutions.co.uk', // sender address
//             from: senderMail,
//             // to: data.email, // list of receivers
//             to: ['ayush@westgateithub.com'],
//             subject: `Invitation to Join SaiVen Technology Solutions Limited - Complete Your Registration`, // Subject line
//             text: `Dear ${data.newCandidateName},\n\nYou have been referred by ${data.name} to join SaiVen Technology Solutions Limited! We are excited to invite you to be part of our professional network.\n\nTo get started, please complete your registration by clicking the link below: ${data.link}\n\nOnce registered, you will gain access to opportunities in UK Public Sector Contracts and be a part of a community of professionals just like you.\n\nImportant: Please use the Referral Code – ${data.referralCode} while completing your registration.\n\nWe look forward to welcoming you!\n\nBest regards,\nHR Team\nSaiVen Technology Solutions Limited`, // plain text body
//             html: referViaCode(data), // html body
//         });

//         return true;

//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// }


export async function inviteLoginEmailSend(data: any): Promise<boolean> {
    try {
        const subject = `Welcome to SaiVen Technology Solutions Limited - Access Your Candidate Portal`;
        const htmlBody = inviteLoginEmail(data);

        await sendResetPasswordEmail(data.email, htmlBody, subject);

        console.log("Invite login email sent to:", data.email);
        return true;
    } catch (err) {
        console.error("Error sending invite login email:", err);
        return false;
    }
}

// export async function inviteLoginEmailSend(data: any) {
//     try {
//         await transporter.sendMail({
//             // from: 'info@saivensolutions.co.uk', // sender address
//             from: senderMail,
//             // to: data.email, // list of receivers
//             to: ['ayush@westgateithub.com'],
//             subject: `Welcome to SaiVen Technology Solutions Limited - Access Your Candidate Portal`, // Subject line
//             text: `Dear ${data.candidateName},\n\nThank you for registering with Us! We are excited to have you join our network of professionals.\n\nTo get started, please log in to your candidate portal: ${data.link}\n\nIf you have any questions, please feel free to reach out to me at jamie.thompson@saivensolutions.co.uk\n\nBest regards,\nJamie Thompson\nRecruitment Lead\nSaiVen Technology Solutions Limited`, // plain text body
//             html: inviteLoginEmail(data), // html body
//         });

//         return true;

//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// }

// Done

// Wrapper to send to multiple recipients via Microsoft Graph

export async function responseEmailSend(data: any): Promise<boolean> {
    try {
        const subject = "New User Registration Alert - CIR System";
        const htmlBody = generateEmailTemplateResponseEmailSend(data);

        const recipients = [
            "jamie.thompson@saivensolutions.co.uk",
            "rmswestgate@gmail.com" // fixed: removed extra `k` in `.comk`
        ];

        // Send email to multiple recipients
        await sendResetPasswordEmail(recipients, htmlBody, subject);

        console.log("Response email sent to CIR team.");
        return true;

    } catch (err) {
        console.error("Error sending response email:", err);
        return false;
    }
}

// export async function responseEmailSend(data: any) {
//     try {
//         await transporter.sendMail({
//             // from: 'info@saivensolutions.co.uk', // sender address
//             from: senderMail,
//             to: ["jamie.thompson@saivensolutions.co.uk", "rmswestgate@gmail.comk"], // list of receivers
//             subject: "New User Registration Alert - CIR System", // Subject line
//             text: `New User Registration Name is ${data.name} and Email is ${data.email}`, // plain text body
//             html: generateEmailTemplateResponseEmailSend(data), // html body
//         });

//         return true;

//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// }

// ACR Mail

// Remaining
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
        console.log("=============== email call ====================")
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            to: ['ayush@westgateithub.com'],
            subject: "Immediate Action Required: Confirm Capacity for New Active Role(s) within 48 Hours", // Subject line
            text: ``, // plain text body
            html: activeRolesPostedMailTemplate(data), // html body
        });
        console.log("=============== email call ====================, done send")
        return true;

    } catch (err) {
        console.log("=========== send error =========== ", err)
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

// Done
export async function adminMailWithPassword(reciverEmail: string, data: any) {
    try {
        await transporter.sendMail({
            // from: 'info@saivensolutions.co.uk', // sender address
            from: senderMail,
            // to: reciverEmail, // list of receivers
            // to: ['ayush@westgateithub.com'],
            to: ['rmswestgate@gmail.com', 'jamie.thompson@saivensolutions.co.uk'], // Done
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