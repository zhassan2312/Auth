// Import the Nodemailer library
import nodemailer from 'nodemailer'
import emailTemplate from './emailTemplate.js'

const sendEmail = async (email, otp) => {
    try {
        // Validate inputs
        if (!email || !otp) {
            throw new Error('Email and OTP are required');
        }

        // Validate environment variables
        if (!process.env.USER_MAIL || !process.env.USER_PASS) {
            throw new Error('Email configuration missing. Check USER_MAIL and USER_PASS environment variables.');
        }

        console.log('Attempting to send email to:', email);
        console.log('Using sender email:', process.env.USER_MAIL);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            },
        });

        // Test the connection
        await transporter.verify();
        console.log('Email transporter verified successfully');

        // Configure the mailoptions object
        const mailOptions = {
            from: {
                name: 'SecureAuth App',
                address: process.env.USER_MAIL // Use env variable instead of hardcoded
            },
            to: email,
            subject: '🔐 Verify Your Account - OTP Code Inside',
            html: emailTemplate(otp)
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;

    } catch (error) {
        console.error('Email sending failed:', error.message);
        
        // Provide specific error messages for common issues
        if (error.code === 'EAUTH') {
            throw new Error('Gmail authentication failed. Please check your email credentials and ensure 2FA is enabled with an app password.');
        }
        if (error.code === 'ENOTFOUND') {
            throw new Error('Network error. Please check your internet connection.');
        }
        if (error.code === 'ETIMEDOUT') {
            throw new Error('Email service timeout. Please try again later.');
        }
        
        throw error;
    }
}

export default sendEmail;