import nodemailer from 'nodemailer';
import type { ContactFormData } from './validations';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 2525,
    secure: false, // Use STARTTLS (true for port 465, false for other ports)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate HTML email template
const generateEmailTemplate = (data: ContactFormData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #2563eb;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          margin: -30px -30px 20px -30px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #4b5563;
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value {
          color: #1f2937;
          font-size: 16px;
        }
        .message-value {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 4px;
          border-left: 4px solid #2563eb;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚚 New Contact Form Submission</h1>
        </div>

        <div class="field">
          <span class="label">Name</span>
          <span class="value">${data.name}</span>
        </div>

        <div class="field">
          <span class="label">Email</span>
          <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>

        <div class="field">
          <span class="label">Phone</span>
          <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
        </div>

        <div class="field">
          <span class="label">Message</span>
          <div class="message-value">${data.message}</div>
        </div>

        <div class="footer">
          <p>This email was sent from the Blitz Hauling contact form.</p>
          <p>Reply to this email will go to: ${data.email}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send contact form email
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@blitzhauling.com',
    to: process.env.EMAIL_TO || 'info@blitzhauling.com',
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: generateEmailTemplate(data),
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}

// Verify email configuration (optional, for testing)
export async function verifyEmailConnection(): Promise<boolean> {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}
