import dotenv from 'dotenv';
import sendEmail from './src/utils/sendEmail.js';

// Load environment variables
dotenv.config();

async function testEmail() {
    try {
        console.log('Testing email configuration...');
        console.log('USER_MAIL:', process.env.USER_MAIL);
        console.log('USER_PASS length:', process.env.USER_PASS?.length);
        
        const testOTP = '123456';
        const testEmail = 'test@example.com'; // Replace with your test email
        
        await sendEmail(testEmail, testOTP);
        console.log('✅ Email test successful!');
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.error('Full error:', error);
    }
}

testEmail();
