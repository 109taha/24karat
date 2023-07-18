const nodemailer = require("nodemailer");

const sendEmail = async (name, email, subject, Data) => {
    try {
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
            subject: subject,
            html: `
            <h1>Hi ${name}</h1><br>
            <h2>We found your request and giving you an estimate</h2><br>
            <h3 ${Data}</h3>            
            `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;