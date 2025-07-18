import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Full received data:", data);

  const { emails, title, content } = data;

  if (!emails || emails.length === 0) {
    console.log("No subscribers found inside API route");
    return new Response(JSON.stringify({ message: "No subscribers found" }), {
      status: 200,
    });
  }

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
        html: content,
      };

      console.log("Sending email to:", email);
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
