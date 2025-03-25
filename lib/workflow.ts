import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";
import nodemailer from "nodemailer";

type EmailProps = {
  email: string;
  subject: string;
  message: string;
};

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export async function sendEmail({
  email,
  subject,
  message,
}: EmailProps): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.env.mail.user,
      pass: config.env.mail.password,
    },
  });

  const mailOptions = {
    from: "BookNGo",
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
