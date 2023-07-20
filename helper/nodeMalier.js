const nodemailer = require("nodemailer");

const sendEmail = async (name, userEmail, Id, DesignName, type, prices, timeDuration) => {
    try {
        console.log('Recipient email:', userEmail); // Check the value of the email variable

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
            from: `"Geek Logicity PTV" ${process.env.USER}`,
            to: userEmail,
            subject: 'Estimate of your design',
            html: `
            Following are the estimate of your Design
            <head>
                <style>
                    table, th, td {
                    border: 1px solid black;
                    }
                </style>
            </head>
            <table>
                <tr align="left">
                    <th>Name: </th>
                    <th>${name} </th>
                </tr>
                <tr align="left">
                    <th>Id: </th>
                    <th>${Id} </th>
                </tr >
                <tr align="left">
                    <th>Design-Name: </th>
                    <th>${DesignName} </th>
                </tr>
                <tr align="left">
                    <th>Design-type: </th>
                    <th>${type} </th>
                </tr>
                <tr align="left">
                    <th>Prices: </th>
                    <th>$ ${prices}</th>
                </tr>
                <tr align="left">
                    <th>Time-Duration: </th>
                    <th>${timeDuration} </th>
                </tr>
            </table>`
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

module.exports = sendEmail;