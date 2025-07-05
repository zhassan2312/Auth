import nodemailer from 'nodemailer';
import emailTemplate from './emailTemplate.js';

const sendEmail = async (email, otp) => {
  // Validate inputs
  if (!email || !otp) throw new Error('Email and OTP are required');
  if (!process.env.USER_MAIL || !process.env.USER_PASS) {
    throw new Error('Email configuration missing');
  }

  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: `SecureAuth App <${process.env.USER_MAIL}>`,
    to: email,
    subject: '🔐 Verify Your Account - OTP Code Inside',
    html: emailTemplate(otp),
    text: `Your verification code is: ${otp}`
  };

  // Send email
  try {
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Map common error codes to user-friendly messages
    const errorMap = {
      EAUTH: 'Authentication failed. Check your email credentials',
      ENOTFOUND: 'Network error. Check your internet connection',
      ETIMEDOUT: 'Email service timeout. Please try again'
    };

    throw new Error(errorMap[error.code] || 'Email sending failed');
  }
};

export default sendEmail;