import nodemailer from "nodemailer";

export async function POST(req: { json: () => any }) {
  const data = await req.json();

  const res = await fetch(`${process.env.API_URL}/api/subscribers`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
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
