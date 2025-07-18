import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // 1. Получаем список подписчиков из Strapi REST API
  // Здесь предполагается, что у тебя есть публичный эндпоинт или token-based доступ
  const res = await fetch(`${process.env.STRAPI_URL}/api/subscribers`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  });

  const subscribersData = await res.json();

  const subscribers = subscribersData.data || [];

  console.log(`🟢 Found ${subscribers.length} subscribers`);

  if (subscribers.length === 0) {
    return new Response(JSON.stringify({ message: "No subscribers found" }), {
      status: 200,
    });
  }

  // 2. Создаем transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 3. Отправляем письма по очереди (или сделай Promise.all для параллельной отправки)
  for (const subscriber of subscribers) {
    const email = subscriber.attributes.email;

    const mailOptions = {
      from: '"Your Site" <noreply@example.com>',
      to: email,
      subject: data.title,
      html: data.content,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${email}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}`, error);
    }
  }

  return new Response(
    JSON.stringify({
      message: `Newsletter sent to ${subscribers.length} users`,
    }),
    {
      status: 200,
    }
  );
}
