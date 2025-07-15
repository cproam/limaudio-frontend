import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const {
    aboutForm,
    headline,
    email,
    name,
    phone,
    comment,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_campaign_name,
    utm_content,
    utm_term,
    utm_placement,
    utm_device,
    utm_region_name,
    utm_position,
    utm_position_type,
    utm_source_type,
    utm_yclid,
    analytics,
    essential,
    marketing,
  } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
    });

    let emailText = `
${aboutForm ? `Форма: ${aboutForm}` : ""}
Тема:   ${headline}
Имя:     ${name}
Телефон: ${phone}
${email ? `Email: ${email}` : ""}
${comment ? `Сообщение: ${comment}` : ""}

----------------------------
📝 UTM данные заявки
----------------------------

utm_source: ${utm_source || ""}
utm_medium: ${utm_medium || ""}
utm_campaign_name: ${utm_campaign_name || ""}
utm_campaign: ${utm_campaign || ""}
utm_content: ${utm_content || ""}
utm_term: ${utm_term || ""}
utm_placement: ${utm_placement || ""}
utm_device: ${utm_device || ""}
utm_region_name: ${utm_region_name || ""}
utm_position: ${utm_position || ""}
utm_position_type: ${utm_position_type || ""}
utm_source_type: ${utm_source_type || ""}
utm_yclid: ${utm_yclid || ""}
Аналитика: ${analytics || ""}
Маркетинг: ${marketing || ""}
Прочее: ${essential || ""}
`.trim();

    const mailOptions = {
      from: `"" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Заявка с сайта Limaudio",
      text: emailText.trim(),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
