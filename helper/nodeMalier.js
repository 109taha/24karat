const nodemailer = require("nodemailer");

const sendEmail = async (name, email, data) => {
    try {
        console.log('Recipient email:', email); // Check the value of the email variable

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Estimate of your design',
            html: `
            <h1>Hi ${name}</h1><br>
            <h2>We found your request and giving you an estimate</h2><br>
            <h3 ${data}</h3>            
            `
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;