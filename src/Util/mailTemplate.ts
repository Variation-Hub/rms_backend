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
               SaiVen Technology Solutions Limited
            </p>
        </div>
    `;
}

export const referViaCode = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${data.newCandidateName},</p>
            <p>You have been referred by ${data.name}  for your professional expertise as a ${data.currentWork} to join SaiVen Technology Solutions Limited! We are excited to invite you to be part of our professional network.</p>
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
               SaiVen Technology Solutions Limited
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
               SaiVen Technology Solutions Limited
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
                <p>Thank you for registering with SaiVen's Agency Capacity Record (ACR) system. We’re excited to have you as part of our recruitment partner network!<p>
                <p>Your registration has been successfully received, and our team will review your profile shortly. We will get back to you once the review is complete to confirm the next steps.</p>
                <p>In the meantime, if you have any questions or need assistance, please don't hesitate to reach out to <a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:#467886;">jamie.thompson@saivensolutions.co.uk</a>.</p>
                <p>Thank you for your interest in partnering with us, we look forward to working with you!.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const activeRolesPostedMailTemplate = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have just posted new active roles in our Agency Capacity Record System, and your prompt response is required.</p>
                <p>Please log in to the system and review the roles under your agency's account. It is essential to mark "Yes" or "No" and confirm your capacity for each role within <b>48 hours</b>. Additionally, please upload the CVs within 5 days of confirming.</p>
                <p>Access the System Here:
                <a href="https://rms.saivensolutions.co.uk/#/acr/acr-login" style="display: inline-block; font-weight: bold;">Login to Agency Capacity Record System</a>
                </p>
                <p><strong>Important:</strong> The posted jobs will only be valid for 2 hours, so please respond within this timeframe.</p>
                <p><strong>Steps to Confirm:</strong></p>
                <ol>
                    <li>Log in to the system.</li>
                    <li>Navigate to the "All Roles" section.</li>
                    <li>Select the Active Role.</li>
                    <li>Mark "Yes" or "No" for each role.</li>
                    <li>Confirm the number of candidates you can supply.</li>
                    <li>Submit.</li>
                </ol>
                <p>Please note that if you do not respond within the given timeframe, your ability to supply candidates for these roles will be impacted.</p>
                <p>If you have any questions or need assistance, please feel free to reach out to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const activeRolesPostedMailTemplateCIRAdmin = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data?.name},</b></p>
                <p>We have recently posted new active role ${data?.job_type} in our CIR Portal, and your prompt response is required.</p>
                <p>Please log in to your CIR account to review this role and all the available roles. It is important that you indicate your interest by applying for any preferred role before the listed job expiry date.</p>
                <p>Access the CIR Portal:
                <a href="https://rms.saivensolutions.co.uk/#/cir/cir-login" style="display: inline-block; font-weight: bold;">Login to CIR</a>
                </p>
                <p>Please follow these steps to confirm your interest: </p>
                <ol>
                    <li>Log in to the system.</li>
                    <li>Navigate to the "All Roles" section.</li>
                    <li>Download and review the ReadMe document for the role.</li>
                    <li>Click on the “Apply” button for the role you wish to pursue.</li>
                    <li>Use your existing CV or upload an updated version, and specify your preferred work location for that role.</li>
                    <li> Submit your application..</li>
                </ol>
                <p>Important: Roles are only valid until the posted expiry date. Kindly ensure your response is submitted within this timeframe.</p>
                <p>If you have any questions or need assistance, please feel free to reach out to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your prompt attention to this matter.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
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
                        <th style="border: 1px solid #ddd; text-align: left;">Published Date</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Day Rate</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd;">${data.jobTitle}</td>
                        <td style="border: 1px solid #ddd;">${data.numOfRoles}</td>
                        <td style="border: 1px solid #ddd;">${data.publishedDate}</td>
                        <td style="border: 1px solid #ddd;">${data.dayRate}</td>
                    </tr>
                </table>
                <p>Please review the job details and take the necessary actions as soon as possible.</p>
                <p>Best regards,<br>
                <b>SaiVen Technology Solutions Limited</p>
            </div>
        </div>
 `
}

export const uploadCVAlertMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>Thank you for confirming your capacity to supply candidates for the role of <b>${data.role}</b> in our Agency Capacity Record System.</p>
                <p>As a next step, please <b>upload the CV(s)</b> of the candidates you have confirmed for this role within <b>5 days</b> of your confirmation through our portal.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>Day Rate:</b> ${data.day_rate}</li>
                    <li><b>No. of Positions you confirmed:</b> ${data.position}</li>
                    <li><b>No. of Positions you confirmed:</b> ${data.position}</li>
                </ul>
                
                <p> <b>Upload CV(s) Here:</b>
                <a href="https://rms.saivensolutions.co.uk/#/acr/acr-login" style="display: inline-block; font-weight: bold;">Login to Agency Capacity Record System</a>
                </p>
                <p>Please ensure that the CV(s) are uploaded within the specified timeframe. Please note that if you do not upload within the given timeframe, your agreement to supply candidates could be revoked.</p>
                <p><strong>Steps to Upload CV:</strong></p>
                <ol>
                    <li>Log in to the System.</li>
                    <li>Navigate to the "All Roles" Section.</li>
                    <li>Click the Upload CV Button for this Role.</li>
                    <li>Upload all your CVs.</li>
                    <li>Submit.</li>
                </ol>
                <p>If you have any questions or need assistance, please feel free to reach out to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const agencyCapacityConfirmationTemplate = (data: {
    agencyName: string;
    jobRole: string;
    clientName: string;
    dayRate: string;
    positionsConfirmed: number;
    deadline: string;
}) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p>Dear Admin,</p>

            <p>This is to inform you that <b>${data.agencyName}</b> has confirmed their capacity to supply candidates for the below role in our Agency Capacity Record System:</p>

            <h4 style="margin-top: 20px;">Role Details:</h4>
            <ul>
                <li><b>Job Role:</b> ${data.jobRole}</li>
                <li><b>Client Name:</b> ${data.clientName}</li>
                <li><b>Day Rate:</b> £${data.dayRate}</li>
                <li><b>No. of Positions Confirmed:</b> ${data.positionsConfirmed}</li>
                <li><b>CV Submission Deadline:</b> ${data.deadline}</li>
            </ul>

            <p>Please monitor CV uploads and ensure the agency completes the submission within the deadline. If the CVs are not uploaded on time, follow-up action may be required.</p>

            <div style="margin-top: 20px;">
                <p>Best regards,<br/>
                <b>SaiVen Technology Solutions Limited</b></p>
            </div>
        </div>
    </div>`;
};


export const cvRecivedMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have successfully received the CVs you uploaded for the role of <b>${data.role}</b> in our Agency Capacity Record System.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>Day Rate:</b> ${data.day_rate}</li>
                    <li><b>No. of Positions you confirmed</b> ${data.position}</li>                    
                </ul>
                
                <p>Thank you for your prompt response and submission of the CVs. Our team will review the CVs and get back to you if any further information or action is needed.</p>
                <p>If you have more CVs to submit , please attach and send them to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const cvReviewMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear HR Team,</b></p>
                <p>We have received the CVs for the recently posted role of ${data.title}. Please find the confirmation below:</p>
                
                <ul>
                    <li><b>Job Title:</b> ${data.title}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>No. of CVs Uploaded:</b> ${data.cv_count}</li>
                    <li><b>Uploaded by:</b> ${data.uploadeBy}</li>
                    <li><b>Upload Date:</b> ${data.date}</li>
                    <li><b>Candidate Nationality:</b> ${data.nationality}</li>
                    <li><b>Candidate Location:</b> ${data.location}</li>
                    
                </ul>
                
                <p>The vetting process will now be initiated by our Management Consultant (MC) team. Please ensure all necessary steps are followed.</p>
             
                <div style="margin-top: 20px;">
                    <p>Best regards,<br/>
                    SaiVen Technology Solutions Limited Limited
                    </p>
                </div>
            </div>
        </div>`
}

export const adminMailTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear Jamie</b></p>
                <p>We would like to inform you that the following agency has successfully completed the ACR Registration:</p>
                
                <ul>
                    <li><b>Agency Name:</b> ${data.agencyName}</li>
                    <li><b>Primary Contact:</b> ${data.name}</li>
                    <li><b>Email:</b> ${data.email}</li>
                    <li><b>Phone:</b> ${data.phone}</li>
                    
                </ul>
                
                <p>Please evaluate the agency and get back to Ayush in case the ACR login details needs to be created for this Agency.<br/></p>
             
                <div style="margin-top: 20px;">
                    <p>Thank you.</p>
                    <p>Best Regards,</p>
                    <p>SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const adminMailWithPhoneTemplate = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear Admin</b></p>
                <p>We are pleased to inform you that an agency has successfully completed the registration process. Below are the login credentials and primary contact details for the agency:</p>
                
                <ul>
                    <li><b>Agency Name:</b> ${data.agencyName}</li>
                    <li><b>Password:</b> ${data.password}</li>
                    <li><b>Primary Contact:</b> ${data.name}</li>
                    <li><b>Email:</b> ${data.email}</li>
                    <li><b>Phone:</b> ${data.phone}</li>
                    
                </ul>
                
                <p>Please ensure the details are securely shared with the respective agency.<br/></p>
             
                <div style="margin-top: 20px;">
                    <p>Thank you.</p>
                </div>
            </div>
        </div>`
}

export const acrUserWelcomeMailTemplate = (data: { userName: string; }) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p>Dear ${data.userName},</p>
            <p>Thank you for registering with <b>SaiVen Technology Solutions</b>. We’re delighted to welcome you to our network of professionals supporting UK Public Sector contracts.</p>

            <p>To get started, please log in to your Agency Portal. For your initial login credentials, kindly contact me at <a href="mailto:jamie.thompson@saivensolutions.co.uk">jamie.thompson@saivensolutions.co.uk</a>.</p>

            <p>Once you receive your temporary password, please reset it immediately for security purposes.</p>

            <p>You can then update your profile, access key information, and explore exciting opportunities.</p>

            <p><a href="https://rms.saivensolutions.co.uk/#/acr/acr-login" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 15px; border-radius: 4px; text-decoration: none;">Login Link</a></p>

            <p>If you have any questions or require support, please don’t hesitate to get in touch.</p>

            <p>We look forward to a successful partnership.</p>

            <div style="margin-top: 20px;">
                <p>Best regards,</p>
                <p><b>Jamie Thompson</b><br/>
                Recruitment Lead<br/>
                SaiVen Technology Solutions Limited<br/>
                <a href="mailto:jamie.thompson@saivensolutions.co.uk">jamie.thompson@saivensolutions.co.uk</a></p>
            </div>
        </div>
    </div>`;
};


export const InActiveRolesPostedMailTemplate = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p><b>Dear Team,</b></p>
                <p>Please be informed that the following inactive job has been posted in the ACR system:</p>
                <ul>
                    <li>Job Title: ${data?.jobTitle}</li>
                    <li>Position Start Date: ${data?.start_date} </li>
                    <li>Client Name: ${data?.client_name}</li>
                </ul>
                <p>If there are any actions required from your end, please proceed accordingly.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

// CIR MAIL TEMPLATE

export const activeRolesPostedMailTemplateCIR = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have just posted new active roles in our Candidate Interest Record System, and your prompt response is required.</p>
                <p>Please log in to the system and review the Active roles under your account. It is essential to mark "Apply" and confirm your interest for each role and further to continue with the same CV or upload a new CV.</p>
                <p>Access the System Here:
                <a href="https://rms.saivensolutions.co.uk/#/cir/cir-login" style="display: inline-block; font-weight: bold;">Login to Candidate Interest Record System</a>
                </p>
                <p><strong>Steps to Apply for an Active Role:</strong></p>
                <ol>
                    <li>Log in to the system.</li>
                    <li>Navigate to the "Active Roles" section.</li>
                    <li>Read the ReadMe document which will have all the details related to the Role.</li>
                    <li>Mark "Apply" for the role in which you are interested.</li>
                    <li>Select “Continue with the current CV” if you wish to continue with the CV you uploaded within our system during registration.</li>
                    <li>Select “Upload New CV” if you wish to upload a new CV and this will replace the old CV from the System.</li>
                    <li>Submit.</li>
                </ol>
                <p>If you have any questions or need assistance, please feel free to reach out to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <p>Thank you for your immediate attention.</p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const newJobAlertMailTemplateCIR = (data: any) => {

    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear Team,</p>
                <p>A new job has been posted in our system. Please find the details below:</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; text-align: left;">Job Title</th>
                        <th style="border: 1px solid #ddd; text-align: left;">No. of Roles</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Published Date</th>
                        <th style="border: 1px solid #ddd; text-align: left;">Day Rate</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd;">${data.jobTitle}</td>
                        <td style="border: 1px solid #ddd;">${data.numOfRoles}</td>
                        <td style="border: 1px solid #ddd;">${data.publishedDate}</td>
                        <td style="border: 1px solid #ddd;">${data.dayRate}</td>
                    </tr>
                </table>
                <p>Please review the job details and take the necessary actions as soon as possible.</p>
                <p>Best regards,<br>
                <b>SaiVen Technology Solutions Limited</p>
            </div>
        </div>
 `
}

export const uploadCVAlertMailTemplateCIR = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have successfully received the CVs you uploaded for the role of <b>${data.role}</b> in our Candidate Interest Record System.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    
                </ul>
                <p>Thank you for your prompt response and submission of the CVs. Our team will review the CVs and get back to you if any further information or action is needed.</p>
                <p>If you have any query, please send them to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}

export const candidateInterestNotificationTemplate = (data: {
    jobCode: string;
    jobTitle: string;
    clientName: string;
    candidateName: string;
    appliedDate: string;
}) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p>Dear HR Team,</p>

            <p>We have received interest from a candidate on <b>CIR</b> for the recently posted role of <b>${data.jobTitle}</b>. Please find the confirmation below:</p>

            <h4 style="margin-top: 20px;">Candidate Application Details:</h4>
            <ul>
                <li><b>Job Code:</b> ${data.jobCode}</li>
                <li><b>Job Title:</b> ${data.jobTitle}</li>
                <li><b>Client Name:</b> ${data.clientName}</li>
                <li><b>Applied By:</b> ${data.candidateName}</li>
                <li><b>Applied Date:</b> ${data.appliedDate}</li>
            </ul>

            <p>The vetting process will now be initiated by our <b>Management Consultant (MC)</b> team. Please ensure all necessary steps are followed.</p>

            <div style="margin-top: 20px;">
                <p>Best regards,<br/>
                <b>SaiVen Technology Solutions Limited</b></p>
            </div>
        </div>
    </div>`;
};

export const cvRecivedMailTemplateCIR = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear <b>${data.name},</b></p>
                <p>We have successfully received the new CVs you uploaded for the role of <b>${data.role}</b> in our Candidate Interest Record System.</p>
                
                <p><strong>Role Details:</strong></p>
                <ul>
                    <li><b>Job Role:</b> ${data.role}</li>
                </ul>
                <p>Thank you for your prompt response and submission of the CVs. Our team will review the CVs and get back to you if any further information or action is needed.</p>
               
                <p>If you have any query, please send them to <br/><a href="mailto:jamie.thompson@saivensolutions.co.uk" style="text-decoration:none; font-weight:bold; color:skyblue;">jamie.thompson@saivensolutions.co.uk</a></p>
                <div style="margin-top: 20px;">
                    <p>Best regards,<br>
                    SaiVen Technology Solutions Limited</p>
                </div>
            </div>
        </div>`
}
// For cvRecivedMailTemplateCIR
//  <p> FYI: Your new CV has been saved in our system, you can use it when applying for other jobs too. </p>

export const cvReviewMailTemplateCIR = (data: any) => {
    return `<div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 80%; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <p>Dear HR Team,</b></p>
                <p>We have received interest from a candidate on CIR for the recently posted role of  ${data.title}. Please find the confirmation below:</p>
                
                <ul>
                    <li><b>${data?.id}</b></li>
                    <li><b>Job Title:</b> ${data.title}</li>
                    <li><b>Client Name:</b> ${data.clientName}</li>
                    <li><b>Applied  by:</b> ${data.uploadeBy}</li>
                    <li><b>Applied  Date:</b> ${data.date}</li>
                </ul>
                
                <p>The vetting process will now be initiated by our Management Consultant (MC) team. Please ensure all necessary steps are followed.</p>
             
                <div style="margin-top: 20px;">
                    <p>Best regards,<br/>
                    SaiVen Technology Solutions Limited Limited
                    </p>
                </div>
            </div>
        </div>`
}