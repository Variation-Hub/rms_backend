import { generateEmailTemplateCard } from "./mailTemplate";

const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

const senderMail = "darshandumaraliya@gmail.com";

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

export async function emailHelper(reciverEmail: string, data: any, user: any) {
    try {
        const subject = 'New Card Add';
        const htmlBody = generateEmailTemplateCard(data, user);

        await sendResetPasswordEmail(reciverEmail, htmlBody, subject);
    } catch (err) {
        console.error('Graph API mail error:', err);
    }
}