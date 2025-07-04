// Import the Nodemailer library
import nodemailer from 'nodemailer'
import emailTemplate from './emailTemplate.js'
const sendEmail = (email, otp) => {
    const transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_MAIL,
            pass:process.env.USER_PASS
        },
        });
    // Configure the mailoptions object
    const mailOptions = {
        from: {
            name: 'SecureAuth App',
            address: process.env.EMAIL_USER || 'zhassan2312@gmail.com'
        },
        to: email,
        subject: '🔐 Verify Your Account - OTP Code Inside',
        html: emailTemplate(otp)
    };

    // Send the email
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Email Error:', error);
                reject(error);
            } else {
                console.log('Email sent successfully: ' + info.response);
                resolve(info);
            }
        });
    });
}

export default sendEmail;