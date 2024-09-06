export const generateEmailTemplateCard = (data: any, user: any) => {
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

export const generateEmailTemplateForgotPassword = (data: any) => {
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

export const referViaCode = (data: any) => {
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

export const inviteLoginEmail = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${data.candidateName},</p>
            <p>Thank you for registering with Us! We are excited to have you joining our network of professionals.</p>
            <p>To get started, please log in to your candidate portal, where you can access all the information, update your profile, and explore opportunities in UK Public Sector Contracts with us and earn through refer a friend.</p>
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

export const generateEmailTemplateResponseEmailSend = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear Admin,</p>
            <p>A new user has successfully registered into the CIR System. Please find the registration details below:</p>
            <ul>
                <li><b>User Name : </b>${data.name}</li>
                <li><b>Email : </b>${data.email}</li>
            </ul>
            <p>Please log in to the portal to review the details and take any necessary actions.</p>
            <br/>
            <p>Best regards,<br/>CIR System</p>
        </div>
    `;
}

// ACR Mail Templates

export const acrPasswordGeneratedMailTemplate = (data: any) => {

    return `
       <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>Thank you for registering with SaiVen's Agency Candidate Record (ACR) system. We’re excited to have you as part of our recruitment partner network!<p>
                <p>Your registration has been successfully received, and our team will review your profile shortly. We will get back to you once the review is complete to confirm the next steps.</p>
                <p>In the meantime, if you have any questions or need assistance, please don't hesitate to reach out at <a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:#467886;">jamie.thompson@saivensolutions.co.uk</a>.</p>
                <p>Thank you again for partnering with us, and we look forward to working together.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Team</p>
                </div>
            </div>
        </div>`
}

export const activeRolesPostedMailTemplate = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have just posted new active roles in our Agency Capacity Record System, and your prompt response is required.</p>
                <p>Please log in to the system and review the roles under your agency's account. It is essential to mark "Yes" or "No" and confirm your capacity for each role within 2 hours. Additionally, please upload the CVs within 24 hours of confirming.</p>
                <p>Access the System Here:
                <a href="${data.link}" style="display: inline-block; font-weight: bold;">Login to Agency Capacity Record System</a>
                </p>
                <p><strong>Important:</strong> The posted jobs will only be valid for 2 hours, so please respond within this timeframe.</p>
                <p><strong>Steps to Confirm:</strong></p>
                <ol>
                    <li>Log in to the system.</li>
                    <li>Navigate to the "All Roles" section.</li>
                    <li>Select the Active Role.</li>
                    <li>Mark "Yes" or "No" for each role.</li>
                    <li>Confirm the number of candidates you can supply.</li>
                </ol>
                <p>Please note that if you do not respond within the given timeframe, your ability to supply candidates for these roles will be impacted.</p>
                <p>If you have any questions or need assistance, please feel free to reach out to me at <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    <b>Jamie Thompson</b><br>
                    <b>Recruitment Lead</b><br>
                    SaiVen Technology Solutions</p>
                </div>
            </div>
        </div>`
}

export const newJobAlertMailTemplate = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear Sales Team,</p>
                <p>A new job has been posted in our system. Please find the details below:</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; text-align: left;">Job Title</th>
                        <th style="border: 1px solid #ddd; text-align: left;">No. of Roles</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Position Start Date</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Published Date</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Client Name</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Location</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Day Rate</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd;">${data.jobTitle}</td>
                        <td style="border: 1px solid #ddd;">${data.numOfRoles}</td>
                        <td style="border: 1px solid #ddd;">${data.startDate}</td>
                        <td style="border: 1px solid #ddd;">${data.publishedDate}</td>
                        <td style="border: 1px solid #ddd;">${data.clientName}</td>
                        <td style="border: 1px solid #ddd;">${data.location}</td>
                        <td style="border: 1px solid #ddd;">${data.dayRate}</td>
                    </tr>
                </table>
                <p>Please review the job details and take the necessary actions as soon as possible. If you require any further information, feel free to reach out.</p>
                <p>Best regards,<br>
                <b>${data.pocName}</b><br>
                <b>${data.jobTitle}</b><br>
                ${data.companyName}<br>
                ${data.contactInfo}</p>
            </div>
        </div>
 `
}

export const uploadCVAlertMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>Thank you for confirming your capacity to supply candidates for the role of [Job Role] in our Agency Capacity Record System.</p>
                <p>As a next step, please upload the CV(s) of the candidates you have confirmed for this role within 24 hours of your confirmation through our portal.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>Day Rate:</b> ${data.day_rate}</li>
                    <li><b>No. of Positions you confirmed:</b> ${data.position}</li>
                    <li><b>Role Type:</b> ${data.roleType}</li>
                    
                </ul>
                
                <p>Upload CV(s) Here:
                <a href="${data.link}" style="display: inline-block; font-weight: bold;">Login to Agency Capacity Record System</a>
                </p>
                <p>Please ensure that the CV(s) are uploaded within the specified timeframe. Please note that if you do not respond within the given timeframe, your application to supply candidates for these roles will be impacted.</p>
                <p>If you have any questions or need assistance, please feel free to reach out to me at <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    <b>Jamie Thompson</b><br>
                    <b>Recruitment Lead</b><br>
                    SaiVen Technology Solutions</p>
                </div>
            </div>
        </div>`
}

export const cvRecivedMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have successfully received the CV(s) you uploaded for the role of [Job Role] in our Agency Capacity Record System.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>Day Rate:</b> ${data.day_rate}</li>
                    <li><b>No. of Positions you confirmed:</b> ${data.position}</li>
                    <li><b>Role Type:</b> ${data.roleType}</li>
                    
                </ul>
                
                <p>Thank you for your prompt response and submission of the CVs. Our team will review the CV(s) and get back to you if any further information or action is needed.</p>
                <p>If you have any questions or need assistance, please feel free to reach out to me at <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    <b>Jamie Thompson</b><br>
                    <b>Recruitment Lead</b><br>
                    SaiVen Technology Solutions</p>
                </div>
            </div>
        </div>`
}

export const cvReviewMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear HR Team,</b></p>
                <p>We have received the CVs for the recently posted role(s). Please find the confirmation below:</p>
                
                <ul>
                    <li><b>Job Title:</b> ${data.title}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>No. of CVs Uploaded:</b> ${data.cv_count}</li>
                    <li><b>Uploaded by:</b> ${data.uploadeBy}</li>
                    <li><b>Upload Date:</b> ${data.date}</li>
                    
                </ul>
                
                <p>The vetting process will now be initiated by our Management Consultant (MC) team. Please ensure all necessary steps are followed.</p>
                <p>If you have any questions or need assistance, please feel free to contact us. <br/></p>
             
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    <b>${data.name}</b><br>
                    <b>${data.job_title}</b><br>
                    <b>${data.company}</b><br>
                    <b>${data.contact}</p>
                </div>
            </div>
        </div>`
}