import { Request, Response } from "express";
import { sendEmail, sendWelcomeEmail } from "../services/emailService.js";

export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }
    await sendEmail({
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });
    res.json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Example: send welcome email after registration (call this from auth controller)
export const sendWelcomeEmailController = async (
  req: Request,
  res: Response
) => {
  const { email, name } = req.user!; // assumes user attached by auth
  try {
    await sendWelcomeEmail(email, name);
    res.json({ message: "Welcome email sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send welcome email" });
  }
};
