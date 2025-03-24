import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";
import emailjs from "@emailjs/browser";

type EmailParams = {
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
}: EmailParams): Promise<void> {
  await emailjs.send(
    "university-library",
    "general_email",
    {
      subject: subject,
      message: message,
      email: email,
    },
    {
      publicKey: config.env.emailjs.publicKey,
    },
  );
}
