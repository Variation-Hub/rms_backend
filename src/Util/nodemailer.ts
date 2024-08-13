const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "6032e77ba3996b3696c7b9c5b8fc8d4e"
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


const generateEmailTemplateForgotPassword = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${data.newCandidateName},</p>
            <p>We received a request to reset the password for your account. If you have made this request, please click the link below to reset your password:</p>
            <p style="text-align: center;">
                <a href="${data.link}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password Link</a>
            </p>
            <p>For your security, this link will expire in 24 hours. If you did not request a password reset, please ignore this email, and your password will remain unchanged.</p>
            <p>If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@saivensolutions.co.uk">info@saivensolutions.co.uk</a></p>
            <br/>
            <p>Best regards,</p>
            <p><strong>Tech Team</strong><br/>
               Saiven Technology Solutions
            </p>
        </div>
    `;
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

const referViaCode = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${data.newCandidateName},</p>
            <p>You have been referred by ${data.name}  for your professional expertise as a ${data.currentWork} to join Saiven Technology Solutions! We are excited to invite you to be part of our professional network.</p>
            <p>To get started, please complete your registration by clicking the link below:</p>
            <p style="text-align: center;">
                <a href="${data.link}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Complete Your Registration</a>
            </p>
            <p>Once registered, you will gain access to opportunities in UK Public Sector Contracts and be a part of a community of professionals just like you.</p>
            <p><strong>Important:</strong> Please use the Referral Code – <strong>${data.referralCode}</strong> while completing your registration.</p>
            <p>We look forward to welcoming you!</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>HR Team</strong><br/>
               Saiven Technology Solutions
            </p>
        </div>
    `;
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


const inviteLoginEmail = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${data.candidateName},</p>
            <p>Thank you for registering with Us! We are excited to have you <span style="color:red;">joining</span> our network of professionals.</p>
            <p>To get started, please log in to your candidate portal, where you can access all the information, update your profile, and explore opportunities in UK Public Sector Contracts with us <span style="color:red;">and earn through refer a friend.</span></p>
            <p style="font-weight:bold;">Click the link below to log in</p>
            <p style="text-align: center;">
                <a href="${data.link}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px;">Login Link</a>
            </p>
            <p>If you have any questions or need assistance, please feel free to reach out to me at <a href="mailto:jamie.thompson@saivensolutions.co.uk">jamie.thompson@saivensolutions.co.uk</a>.</p>
            <p>We look forward to working with you!</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>Jamie Thompson</strong><br/>
               Recruitment Lead<br/>
               Saiven Technology Solutions
            </p>
        </div>
    `;
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
