import nodemailer from 'nodemailer';
import { query } from './db';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendConfirmationEmail(
  contactId: number,
  recipientEmail: string,
  firstName: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'We Received Your Message - Neo Global Finance',
      html: `
        <div style="font-family: Arial, sans-serif; color: #1a3a37;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a3a37; margin-bottom: 20px;">Thank You, ${firstName}!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #5a5550;">
              We have received your message and appreciate you reaching out to Neo Global Finance.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #5a5550;">
              Our team will review your inquiry and get back to you shortly with a detailed response tailored to your needs.
            </p>
            <div style="background-color: #f3ebe3; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #9d7f54;">
              <p style="margin: 0; color: #1a3a37;">
                <strong>What happens next:</strong><br/>
                We typically respond within 24-48 hours during business days. In the meantime, feel free to call us or explore our services.
              </p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #5a5550;">
              Best regards,<br/>
              <strong>Neo Global Finance Team</strong>
            </p>
            <hr style="border: none; border-top: 1px solid #dcc9b8; margin: 30px 0;"/>
            <p style="font-size: 12px; color: #a89a8b; text-align: center;">
              Neo Global Finance | Professional Accountancy Services<br/>
              123 Financial Plaza, New York, NY 10001
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // Log email sent
    await query(
      'INSERT INTO email_logs (contact_id, email_type, recipient_email, subject, status) VALUES (?, ?, ?, ?, ?)',
      [contactId, 'confirmation', recipientEmail, mailOptions.subject, 'sent']
    );

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[v0] Email sending failed:', error);

    // Log email failure
    await query(
      'INSERT INTO email_logs (contact_id, email_type, recipient_email, subject, status, error_message) VALUES (?, ?, ?, ?, ?, ?)',
      [contactId, 'confirmation', recipientEmail, 'Confirmation Email', 'failed', (error as Error).message]
    );

    return { success: false, error: (error as Error).message };
  }
}

export async function sendReplyEmail(
  contactId: number,
  recipientEmail: string,
  firstName: string,
  replyMessage: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Re: Your Neo Global Finance Inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; color: #1a3a37;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a3a37; margin-bottom: 20px;">Hello ${firstName},</h1>
            <div style="background-color: #f3ebe3; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9d7f54;">
              ${replyMessage.replace(/\n/g, '<br/>')}
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #5a5550;">
              If you have any further questions, please don't hesitate to contact us.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #5a5550;">
              Best regards,<br/>
              <strong>Neo Global Finance Team</strong>
            </p>
            <hr style="border: none; border-top: 1px solid #dcc9b8; margin: 30px 0;"/>
            <p style="font-size: 12px; color: #a89a8b; text-align: center;">
              Neo Global Finance | Professional Accountancy Services<br/>
              123 Financial Plaza, New York, NY 10001
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // Log email sent
    await query(
      'INSERT INTO email_logs (contact_id, email_type, recipient_email, subject, status) VALUES (?, ?, ?, ?, ?)',
      [contactId, 'reply', recipientEmail, mailOptions.subject, 'sent']
    );

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[v0] Email sending failed:', error);

    // Log email failure
    await query(
      'INSERT INTO email_logs (contact_id, email_type, recipient_email, subject, status, error_message) VALUES (?, ?, ?, ?, ?, ?)',
      [contactId, 'reply', recipientEmail, 'Reply Email', 'failed', (error as Error).message]
    );

    return { success: false, error: (error as Error).message };
  }
}
