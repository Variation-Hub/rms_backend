// import path from "path";
import { acrPasswordGeneratedMailTemplate, acrUserWelcomeMailTemplate, activeRolesPostedMailTemplate, activeRolesPostedMailTemplateCIR, activeRolesPostedMailTemplateCIRAdmin, adminMailTemplate, adminMailWithPhoneTemplate, agencyCapacityConfirmationTemplate, candidateInterestNotificationTemplate, cvRecivedMailTemplate, cvRecivedMailTemplateCIR, cvReviewMailTemplate, cvReviewMailTemplateCIR, generateEmailTemplateCard, generateEmailTemplateForgotPassword, generateEmailTemplateResponseEmailSend, InActiveRolesPostedMailTemplate, inviteLoginEmail, missedACRRoleReapplyMailTemplate, newJobAlertMailTemplate, newJobAlertMailTemplateCIR, referViaCode, RemainderActiveRolesPostedMailTemplateCIRAdmin, uploadCVAlertMailTemplate, uploadCVAlertMailTemplateCIR } from "./mailTemplate";
const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
import axios from 'axios';

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

    const mail: string = "info@saivensolutions.co.uk"

    const message = {
        message: {
            subject,
            body: {
                contentType: 'HTML',
                content: htmlBody,
            },
            toRecipients: recipients,
            // toRecipients: [{ emailAddress: { address: 'darshandumaraliya@gmail.com' } }],
            from: {
                emailAddress: {
                    address: mail,
                },
            },
        },
        saveToSentItems: 'false',
    };

    try {
        await graphClient
            .api(`/users/${mail}/sendMail`)
            .post(message);
        console.log(`Graph Email sent to: ${Array.isArray(to) ? to.join(', ') : to}`);
    } catch (error) {
        console.error('Failed to send mail via Microsoft Graph:', error);
        throw new Error('Graph Email sending failed');
    }
}

export async function sendGraphMail(options: any): Promise<void> {
    const mail: string = "info@saivensolutions.co.uk"

    const message = {
        message: {
            subject: options.subject,
            body: {
                contentType: 'HTML',
                content: options.htmlBody,
            },
            toRecipients: options.to.map((email: any) => ({
                emailAddress: { address: email },
            })),
            ccRecipients: (options.cc || []).map((email: any) => ({
                emailAddress: { address: email },
            })),
            // toRecipients: [{ emailAddress: { address: 'darshandumaraliya@gmail.com' } }],
            // ccRecipients: [{ emailAddress: { address: 'darshandumaraliya@gmail.com' } }],
            from: {
                emailAddress: {
                    address: mail,
                },
            },
        },
        saveToSentItems: 'false',
    };

    await graphClient
        .api(`/users/${mail}/sendMail`)
        .post(message);
}

export async function sendGraphMailWithAttachment(options: any): Promise<void> {
    const mail: string = "info@saivensolutions.co.uk"

    const toRecipients = options.to.map((email: any) => ({
        emailAddress: { address: email },
    }));

    const attachments = [];

    if (options?.attachments?.length) {
        for (const file of options?.attachments) {
            const response = await axios.get(file?.url, { responseType: 'arraybuffer' });
            const base64Data = Buffer.from(response.data).toString('base64');

            attachments.push({
                '@odata.type': '#microsoft.graph.fileAttachment',
                name: file.name,
                contentBytes: base64Data,
                contentType: 'application/octet-stream',
            });
        }
    }

    const message = {
        message: {
            subject: options.subject,
            body: {
                contentType: 'HTML',
                content: options.htmlBody,
            },
            toRecipients,
            // toRecipients: [{ emailAddress: { address: 'darshandumaraliya@gmail.com' } }],
            attachments,
            from: {
                emailAddress: {
                    address: mail,
                },
            },
        },
        saveToSentItems: 'false',
    };
    try {
        await graphClient
            .api(`/users/${mail}/sendMail`)
            .post(message);
    } catch (error) {
        console.log("================", error);
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

export async function acrPasswordGeneratedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Thank You for Registering with SaiVen ACR System";
        const htmlBody = acrPasswordGeneratedMailTemplate(data);

        await sendGraphMail({
            to: [reciverEmail],
            cc: data.ccEmail || [],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        console.error("ACR mail send error:", err);
        return false;
    }
}


export async function activeRolesPostedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Immediate Action Required: Confirm Capacity for New Active Role(s) within 48 Hours";
        const htmlBody = activeRolesPostedMailTemplate(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        return false;
    }
}

export async function RemainderActiveRolesPostedMailForACR(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = `Reapply Opportunity for Recent Role “${data?.roleName}” in Agency Capacity Record System`;
        const htmlBody = missedACRRoleReapplyMailTemplate(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        return false;
    }
}

export async function activeCIRRolesPostedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Action Required: Review and Respond to New Active Role in CIR Portal";
        const htmlBody = activeRolesPostedMailTemplateCIRAdmin(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        return false;
    }
}

export async function RemainderActiveCIRRolesPostedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = `Extended Opportunity to Apply – ${data.job_type} Role Now Open for Your Application`;
        const htmlBody = RemainderActiveRolesPostedMailTemplateCIRAdmin(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        return false;
    }
}

export async function newJobAlertMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "New Job Posted in the System - Action Required";
        const htmlBody = newJobAlertMailTemplate(data);

        const attachment = {
            name: data.filename?.substring(data.filename.indexOf('_') + 1) || 'job-details.pdf',
            url: data.url,
        };

        await sendGraphMailWithAttachment({
            to: [reciverEmail],
            subject,
            htmlBody,
            attachments: [attachment],
        });

        return true;
    } catch (err) {
        console.error('Graph email send error:', err);
        return false;
    }
}

export async function uploadCVAlertMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Immediate Action Required: Upload CV(s) for Confirmed Role within 5 Days";
        const htmlBody = uploadCVAlertMailTemplate(data);

        const attachment = {
            name: data.filename?.substring(data.filename.indexOf('_') + 1) || 'cv-document.pdf',
            url: data.url,
        };

        await sendGraphMailWithAttachment({
            to: [reciverEmail],
            subject,
            htmlBody,
            attachments: [attachment],
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (uploadCVAlertMail):', err);
        return false;
    }
}

export async function uploadCVAlertMailForAdmin(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = `Agency Capacity Confirmation – Role: ${data.jobRole}`;
        const htmlBody = agencyCapacityConfirmationTemplate(data);

        const attachment = {
            name: data.filename?.substring(data.filename.indexOf('_') + 1) || 'cv-document.pdf',
            url: data.url,
        };

        await sendGraphMailWithAttachment({
            to: ["jamie.thompson@saivensolutions.co.uk",
                "rmswestgate@gmail.com"
            ],
            subject,
            htmlBody,
            attachments: [attachment],
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (uploadCVAlertMailForAdmin):', err);
        return false;
    }
}


export async function cvRecivedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Confirmation: CVs Successfully Submitted";
        const htmlBody = cvRecivedMailTemplate(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (cvRecivedMail):', err);
        return false;
    }
}

export async function cvReviewMail(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const attachments: any[] = [
            {
                name: data?.filename?.substring(data.filename.indexOf('_') + 1) || 'attachment',
                url: data?.url,
            },
            ...data?.cvUploaded?.map((file: any) => ({
                name: file?.name?.substring(file?.name.indexOf('_') + 1) || 'cv',
                url: file.url,
            })),
        ];
        const htmlBody = cvReviewMailTemplate(data);

        await sendGraphMailWithAttachment({
            to: ["rmswestgate@gmail.com", "jamie.thompson@saivensolutions.co.uk"],
            subject: "CVs Uploaded - Vetting Process Initiation",
            htmlBody,
            attachments,
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (cvReviewMail):', err);
        return false;
    }
}

export async function adminMail(reciverEmail: string, data: any): Promise<boolean> {
    try {
        await sendGraphMail({
            to: [reciverEmail],
            subject: "New User Registering with SaiVen ACR System",
            htmlBody: adminMailTemplate(data),
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (adminMail):', err);
        return false;
    }
}

export async function adminMailWithPassword(reciverEmail: string, data: any): Promise<boolean> {
    try {
        await sendGraphMail({
            to: ['rmswestgate@gmail.com', 'jamie.thompson@saivensolutions.co.uk'],
            subject: "New User Registering with SaiVen ACR System",
            htmlBody: adminMailWithPhoneTemplate(data),
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (adminMailWithPassword):', err);
        return false;
    }
}

export async function acrUserMailTemplateRegister(reciverEmail: string, data: any): Promise<boolean> {
    try {
        await sendGraphMail({
            to: reciverEmail,
            subject: "Thank You for Registering with SaiVen – Let’s Get Started!",
            htmlBody: acrUserWelcomeMailTemplate(data),
        });

        return true;
    } catch (err) {
        console.error('Graph email send error (acrUserMailTemplateRegister):', err);
        return false;
    }
}

export async function InActiveRolesPostedMail(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Notification: Inactive Job Posted in ACR System";
        const htmlBody = InActiveRolesPostedMailTemplate(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        console.error("Graph email send error (InActiveRolesPostedMail):", err);
        return false;
    }
}

// CIR MAIL
export async function activeRolesPostedMailCIR(
    reciverEmail: string,
    data: any
): Promise<boolean> {
    try {
        const subject = "Action Required: Confirm Capacity for New Active Role";
        const htmlBody = activeRolesPostedMailTemplateCIR(data);

        await sendGraphMail({
            to: [reciverEmail],
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        console.error("Graph email send error (activeRolesPostedMailCIR):", err);
        return false;
    }
}

export async function newJobAlertMailCIR(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const subject = "New Job Posted in the CIR System - Action Required";
        const htmlBody = newJobAlertMailTemplateCIR(data);

        const attachments = data?.url
            ? [
                {
                    name: data.filename?.substring(data.filename.indexOf('_') + 1) || 'attachment',
                    url: data.url,
                }
            ]
            : [];

        await sendGraphMailWithAttachment({
            to: [reciverEmail],
            subject,
            htmlBody,
            attachments,
        });

        return true;
    } catch (err) {
        console.error("Error sending Graph email (newJobAlertMailCIR):", err);
        return false;
    }
}

export async function uploadCVAlertMailCIR(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const subject = "Confirmation: CVs Successfully Submitted for Active Job.";
        const htmlBody = uploadCVAlertMailTemplateCIR(data);

        const attachments = data?.url
            ? [
                {
                    name: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    url: data?.url, // Path to the file
                },
            ]
            : [];

        await sendGraphMailWithAttachment({
            to: [reciverEmail],
            subject,
            htmlBody,
            attachments,
        });

        return true;
    } catch (err) {
        console.error("Error sending Graph email (uploadCVAlertMailCIR):", err);
        return false;
    }
}


export async function sendMailToCIRAdmins(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const subject = "CIR Job Applied - Vetting Process Initiation";
        const htmlBody = candidateInterestNotificationTemplate(data);

        const attachments = data?.url
            ? [
                {
                    name: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                    url: data?.url, // Path to the file
                },
            ]
            : [];

        await sendGraphMailWithAttachment({
            to: ["rmswestgate@gmail.com", "jamie.thompson@saivensolutions.co.uk"],
            subject,
            htmlBody,
            attachments,
        });

        return true;
    } catch (err) {
        console.error("Error sending Graph email (uploadCVAlertMailCIR):", err);
        return false;
    }
}

export async function cvRecivedMailCIR(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const subject = "Confirmation: CVs Successfully Submitted for Active Job.";
        const htmlBody = cvRecivedMailTemplateCIR(data);

        await sendGraphMail({
            to: [reciverEmail], // or ['ayush@westgateithub.com'] if you want to hardcode
            subject,
            htmlBody,
        });

        return true;
    } catch (err) {
        console.error("Error sending Graph email (cvRecivedMailCIR):", err);
        return false;
    }
}

export async function cvReviewMailCIR(reciverEmail: string, data: any): Promise<boolean> {
    try {
        const subject = "CIR Job Applied - Vetting Process Initiation";
        const htmlBody = cvReviewMailTemplateCIR(data);

        const attachments = data.cvUploaded.map((attachment: any) => ({
            name: attachment?.filename?.substring(attachment.filename.indexOf('_') + 1) || "",            // Name of the file to attach
            url: attachment?.url, // Path to the file
        }))

        const allAttachments = [
            {
                name: data?.filename?.substring(data.filename.indexOf('_') + 1) || "",            // Name of the file to attach
                url: data?.url, // Path to the file
            },
            ...attachments
        ];

        await sendGraphMailWithAttachment({
            to: [reciverEmail], // or hardcoded ['ayush@westgateithub.com']
            subject,
            htmlBody,
            attachments: allAttachments,
        });

        return true;
    } catch (err) {
        console.error("Error sending Graph email (cvReviewMailCIR):", err);
        return false;
    }
}