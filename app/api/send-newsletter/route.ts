import nodemailer from "nodemailer";

export async function POST(req: { json: () => any }) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Your Site" <noreply@example.com>',
    to: data.email,
    subject: data.subject,
    html: data.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Email failed", error }), {
      status: 500,
    });
  }
}
