import nodemailer from 'nodemailer';

const hasSmtpConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const FROM_EMAIL = process.env.SMTP_FROM || '"Adama City Citizen Portal" <noreply@adama.gov.et>';

/**
 * Helper to wrap text/html in a standard email frame.
 */
function getEmailLayout(title, contentHtml) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fb;
            color: #002868;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .email-wrapper {
            width: 100%;
            background-color: #f4f7fb;
            padding: 30px 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 40, 104, 0.05);
            border: 1px solid #d4deea;
          }
          .email-header {
            background: linear-gradient(135deg, #002868 0%, #003399 100%);
            padding: 30px 20px;
            text-align: center;
          }
          .email-header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .email-header p {
            color: #c5d4e8;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .email-body {
            padding: 40px 30px;
            line-height: 1.6;
            font-size: 16px;
          }
          .email-footer {
            background-color: #e8eef6;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #5a7194;
            border-top: 1px solid #d4deea;
          }
          .btn-primary {
            display: inline-block;
            background-color: #e5a010;
            color: #1a1204 !important;
            text-decoration: none;
            padding: 12px 28px;
            font-weight: bold;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 2px 4px rgba(229, 160, 16, 0.2);
          }
          .btn-primary:hover {
            background-color: #c8870a;
          }
          .card {
            background-color: #e8eef6;
            border: 1px solid #c5d4e8;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .divider {
            height: 1px;
            background-color: #d4deea;
            margin: 30px 0;
          }
          p {
            margin: 0 0 16px 0;
          }
          strong {
            color: #002868;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="email-header">
              <h1>Adama City Administration</h1>
              <p>Citizen Complaint & Service Request Portal</p>
            </div>
            <div class="email-body">
              ${contentHtml}
            </div>
            <div class="email-footer">
              <p>This is an automated message, please do not reply directly to this email.</p>
              <p>© 2026 Adama City Administration, Adama, Ethiopia</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Sends a password reset email.
 */
export async function sendPasswordResetEmail(user, token) {
  const resetLink = `${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/reset-password?token=${token}`;
  const subject = 'Reset Your Password - Adama City Citizen Portal';
  
  const text = `Hello ${user.fullName},\n\nYou requested to reset your password. Please use the following link to reset your password:\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nAdama City Administration`;

  const html = getEmailLayout(
    'Reset Your Password',
    `
      <p>Hello <strong>${user.fullName}</strong>,</p>
      <p>We received a request to reset the password for your account on the Adama City Citizen Complaint & Service Request Portal.</p>
      <p>Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
      <div style="text-align: center;">
        <a href="${resetLink}" class="btn-primary" target="_blank">Reset Password</a>
      </div>
      <p style="font-size: 13px; color: #5a7194; word-break: break-all;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetLink}">${resetLink}</a>
      </p>
      <div class="divider"></div>
      <p style="font-size: 14px; color: #5a7194;">
        If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>
    `
  );

  if (transporter) {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: user.email,
      subject,
      text,
      html,
    });
  } else {
    console.log('\n================================================================================');
    console.log('📧 [MOCK EMAIL DISPATCH] — Password Reset Request');
    console.log(`To: ${user.fullName} <${user.email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log('================================================================================\n');
  }
}

/**
 * Sends a general notification email.
 */
export async function sendNotificationEmail(user, notification) {
  const subject = `[Adama Citizen Portal] ${notification.title}`;
  
  const text = `Hello ${user.fullName},\n\nYou have a new notification on the Adama Citizen Portal:\n\n${notification.title}\n${notification.message}\n\nLog in to your account to view the details.\n\nBest regards,\nAdama City Administration`;

  const html = getEmailLayout(
    notification.title,
    `
      <p>Hello <strong>${user.fullName}</strong>,</p>
      <p>You have a new update regarding your municipal submissions.</p>
      <div class="card">
        <h3 style="margin-top: 0; color: #002868;">${notification.title}</h3>
        <p style="margin-bottom: 0;">${notification.message}</p>
      </div>
      <p>Please log in to the citizen portal to view complete details, history, and status updates.</p>
      <div style="text-align: center;">
        <a href="${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/login" class="btn-primary" target="_blank">Go to Portal</a>
      </div>
    `
  );

  if (transporter) {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: user.email,
      subject,
      text,
      html,
    });
  } else {
    console.log('\n================================================================================');
    console.log('📧 [MOCK EMAIL DISPATCH] — System Notification');
    console.log(`To: ${user.fullName} <${user.email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Title: ${notification.title}`);
    console.log(`Message: ${notification.message}`);
    console.log('================================================================================\n');
  }
}
