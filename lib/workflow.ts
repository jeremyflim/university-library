import { Client as WorkflowClient } from "@upstash/workflow";
import config from "@/lib/config";

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
  const serviceId = "university-library";
  const templateId = "general_email";
  const publicKey = config.env.emailjs.publicKey;

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      email,
      subject,
      message,
    },
  };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log(`EmailJS error: ${errorText}`);
  }
}
