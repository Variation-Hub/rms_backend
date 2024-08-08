const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "b8c3571b2e58a51a9ddfc53c768cf1ae"
    }
});
const generateEmailTemplateCard = (data: any, user: any) => {
    return `
    <div align="center" class="esd-block-image es-p10t es-p10b" style="padding: 10px 0; margin: 0; font-size: 0px;">
                          <a target="_blank" style="text-decoration: none;">
                            <img src="https://eihicsk.stripocdn.email/content/guids/CABINET_f3fc38cf551f5b08f70308b6252772b8/images/96671618383886503.png" alt="" width="100" style="display: block; border: 0; outline: none; text-decoration: none; width: 100px;">
                          </a>
                        </div>
   <h1 style="margin: 0; line-height: 36px; font-family: Arial, sans-serif; font-size: 30px; font-style: normal; font-weight: bold; color: #333333; text-align: center">
                            New Card Created..!
                          </h1>
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-collapse: collapse; margin: 20px auto;">
        <tbody>
            <!-- Card Details Table -->
            <tr>
                <td align="center" style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th colspan="2" style="font-size: 20px; text-align: center; padding: 15px; background-color: #f2f2f2; border: 1px solid #dddddd;">Card Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Roles in Demand:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${data.rolesInDemand}</td>
                            </tr>
                            <tr style="background-color: #ffffff;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Role Description:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${data.roleDescription}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Certifications/Qualifications:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${data.certifications_qualifications}</td>
                            </tr>
                            <tr style="background-color: #ffffff;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Value A (DDL):</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${data.valueA}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Value B (DDL):</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${data.valueB}</td>
                            </tr>
                            <tr style="background-color: #ffffff;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Value C (DDL):</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">T${data.valueC}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>File:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;"><a href="${data.file?.url}" target="_blank" style="color: #1a73e8; text-decoration: underline;">${data.file?.key?.split('.').slice(0, -1).join('.')}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <!-- User Details Table -->
            <tr>
                <td align="center" style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th colspan="2" style="font-size: 20px; text-align: center; padding: 15px; background-color: #f2f2f2; border: 1px solid #dddddd;">User Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Name:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${user.name}</td>
                            </tr>
                            <tr style="background-color: #ffffff;"> 
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Username:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;">${user.userName}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td style="padding: 10px; border: 1px solid #dddddd;"><strong>Email:</strong></td>
                                <td style="padding: 10px; border: 1px solid #dddddd;"><a href="mailto:${user.email}" style="color: #1a73e8; text-decoration: underline;">${user.email}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td align="center" style="padding: 20px; font-family: Arial, sans-serif; color: #333333;">
                    <p style="margin: 0; font-size: 14px;">Thanks,</p>
                    <p style="margin: 0; font-size: 14px;">Saiven Technology Solution</p>
                </td>
            </tr>
        </tbody>
    </table>
`;
};

export async function emailHelper(reciverEmail: string, data: any, user: any) {

    try {
        await transporter.sendMail({
            from: 'service@uncleblock.in', // sender address
            to: reciverEmail, // list of receivers
            subject: "New Card Add", // Subject line
            text: `Your password is `, // plain text body
            html: generateEmailTemplateCard(data, user), // html body
        });

    } catch (err) {
        console.log(err)
    }
}


const generateEmailTemplateForgotPassword = (data: any) => {
    return `<h1>Reset Password Link</h1>
        <a href="${data.link}" target="_blank">Reset Password Link</a>
    `
}
export async function forgotEmailSend(data: any) {
    try {
        await transporter.sendMail({
            from: 'service@uncleblock.in', // sender address
            to: data.email, // list of receivers
            subject: "Forgot Password Link", // Subject line
            text: `reset link ${data.link}`, // plain text body
            html: generateEmailTemplateForgotPassword(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

const referViaCode = (data: any) => {
    return `<h1>Refer</h1>
        <a href="${data.link}" target="_blank">Refer link</a>
    `
}
export async function referViaCodeEmailSend(data: any) {
    try {
        await transporter.sendMail({
            from: 'service@uncleblock.in', // sender address
            to: data.email, // list of receivers
            subject: `Refer by ${data.name}`, // Subject line
            text: `refer link ${data.link}`, // plain text body
            html: referViaCode(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}

const inviteLoginEmail = (data: any) => {
    return `<h1>Welcome</h1>
        <a href="${data.link}" target="_blank">Login link</a>
    `
}
export async function inviteLoginEmailSend(data: any) {
    try {
        await transporter.sendMail({
            from: 'service@uncleblock.in', // sender address
            to: data.email, // list of receivers
            subject: `Welcome Email`, // Subject line
            text: `Login link ${data.link}`, // plain text body
            html: inviteLoginEmail(data), // html body
        });

        return true;

    } catch (err) {
        console.log(err)
        return false;
    }
}