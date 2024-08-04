const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "b8c3571b2e58a51a9ddfc53c768cf1ae"
    }
});
const generateEmailTemplateCard = (data: any) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="background-color: #007BFF; padding: 20px; text-align: center;">
                <h2 style="color: #fff; margin: 0;">WhyQ Tech</h2>
            </div>
            <div style="padding: 20px;">
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 10px;">
                        <strong>Roles in Demand	:</strong> ${data.rolesInDemand}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Role description :</strong> ${data.roleDescription}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Certifications/Qualifications :</strong> ${data.certifications_qualifications}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Value A (DDL) :</strong> ${data.valueA}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Value B (DDL) :</strong> ${data.valueB}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>Value C (DDL) :</strong> ${data.valueC}
                    </li>
                    <li style="margin-bottom: 10px;">
                        <strong>file :</strong> <a href="${data.file?.url}" style="color: #FB6119;">${data.file?.key?.split('.').slice(0, -1).join('.')}</a>
                    </li>
                </ul>
                <p>Thank you.</p>
            </div>
        </div>
    `;
};

export async function emailHelper(reciverEmail: string, data: any) {
    try {
        await transporter.sendMail({
            from: 'service@uncleblock.in', // sender address
            to: reciverEmail, // list of receivers
            subject: "New Card Add", // Subject line
            text: `Your password is `, // plain text body
            html: generateEmailTemplateCard(data), // html body
        });

    } catch (err) {
        console.log(err)
    }

}