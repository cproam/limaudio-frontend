import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { marked } from "marked";
import { emailTemplate } from "@/lib/emailTemplate";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { emails, title, content } = data;

  if (!emails || emails.length === 0) {
    return new Response(JSON.stringify({ message: "Подписчиков не найдено" }), {
      status: 200,
    });
  }

  const htmlContent = await marked.parse(content);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    for (const email of emails) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: title,
        html: emailTemplate(title, htmlContent),
      };

      await transporter.sendMail(mailOptions);
    }

    return new Response(
      JSON.stringify({ message: "Emails sent", count: emails.length }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Email failed", error }), {
      status: 500,
    });
  }
}
