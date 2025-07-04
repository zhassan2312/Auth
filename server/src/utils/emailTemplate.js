
const emailTemplate = (otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="30" cy="70" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="70" cy="80" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
            animation: float 20s infinite linear;
          }
          
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-50px, -50px) rotate(360deg); }
          }
          
          .shield-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
          }
          
          .header h1 {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
          }
          
          .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            position: relative;
            z-index: 2;
          }
          
          .content {
            padding: 50px 40px;
            text-align: center;
          }
          
          .greeting {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
          }
          
          .message {
            font-size: 16px;
            color: #666;
            margin-bottom: 40px;
            line-height: 1.8;
          }
          
          .otp-container {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
          }
          
          .otp-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,15 65,35 85,35 70,50 75,70 50,60 25,70 30,50 15,35 35,35" fill="rgba(255,255,255,0.1)"/></svg>') no-repeat center;
            opacity: 0.1;
          }
          
          .otp-label {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
          }
          
          .otp-code {
            font-size: 48px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 8px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            font-family: 'Courier New', monospace;
          }
          
          .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            color: #856404;
          }
          
          .warning-icon {
            display: inline-block;
            margin-right: 8px;
            font-size: 18px;
          }
          
          .expires {
            font-size: 14px;
            color: #888;
            margin-top: 20px;
            font-style: italic;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eee;
          }
          
          .footer p {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .social-links {
            margin-top: 20px;
          }
          
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            width: 40px;
            height: 40px;
            background: #667eea;
            border-radius: 50%;
            color: white;
            text-decoration: none;
            line-height: 40px;
            transition: transform 0.3s ease;
          }
          
          .social-links a:hover {
            transform: translateY(-2px);
          }
          
          .security-tips {
            background: #e3f2fd;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
          }
          
          .security-tips h3 {
            color: #1976d2;
            margin-bottom: 15px;
            font-size: 18px;
          }
          
          .security-tips ul {
            color: #666;
            padding-left: 20px;
          }
          
          .security-tips li {
            margin-bottom: 8px;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 15px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .otp-code {
              font-size: 36px;
              letter-spacing: 4px;
            }
            
            .greeting {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="shield-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1>🔐 Account Verification</h1>
            <p>Secure your account with our verification system</p>
          </div>
          
          <div class="content">
            <div class="greeting">Welcome to SecureAuth! 👋</div>
            
            <div class="message">
              We're excited to have you on board! To complete your account setup and ensure the security of your account, please verify your email address using the OTP code below.
            </div>
            
            <div class="otp-container">
              <div class="otp-label">Your Verification Code</div>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <span class="warning-icon">⚠️</span>
              <strong>Important:</strong> This code is confidential. Never share it with anyone. Our team will never ask for your OTP code.
            </div>
            
            <div class="security-tips">
              <h3>🔒 Security Tips</h3>
              <ul>
                <li>This OTP is valid for 10 minutes only</li>
                <li>Use this code only on our official website</li>
                <li>If you didn't request this code, please ignore this email</li>
                <li>Contact support if you notice any suspicious activity</li>
              </ul>
            </div>
            
            <div class="expires">
              ⏰ This verification code expires in 10 minutes for your security.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>SecureAuth Team</strong></p>
            <p>Questions? Contact us at support@secureauth.com</p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
            
            <div class="social-links">
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="LinkedIn">💼</a>
              <a href="#" title="Instagram">📷</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
}

export default emailTemplate