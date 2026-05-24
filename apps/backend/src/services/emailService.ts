import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

const initTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = initTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
};

// Predefined email templates
export const sendWelcomeEmail = async (to: string, name: string) => {
  const subject = "Welcome to our platform!";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>Hello ${name},</h2>
      <p>Thank you for registering on our platform.</p>
      <p>We're excited to have you on board!</p>
      <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #1890ff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">Get Started</a>
      <p>Best regards,<br/>The Team</p>
    </div>
  `;
  await sendEmail({ to, subject, html });
};
