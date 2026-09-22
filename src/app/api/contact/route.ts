import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, projectType, budget, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // sends to yourself
      replyTo: email,             // reply goes directly to the client
      subject: `📩 New Project Inquiry — ${projectType || "General"} from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0c0e14;padding:24px 32px;border-left:4px solid #c9a84c">
            <h2 style="color:#c9a84c;margin:0 0 4px;font-size:20px">New Project Inquiry</h2>
            <p style="color:#888;margin:0;font-size:13px">Received via your portfolio contact form</p>
          </div>
          <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:10px 0;color:#666;width:130px;vertical-align:top">Name</td><td style="padding:10px 0;font-weight:600">${name}</td></tr>
              <tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#666;vertical-align:top">Email</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#c9a84c">${email}</a></td></tr>
              ${projectType ? `<tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#666;vertical-align:top">Project Type</td><td style="padding:10px 0">${projectType}</td></tr>` : ""}
              ${budget ? `<tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#666;vertical-align:top">Budget</td><td style="padding:10px 0">${budget}</td></tr>` : ""}
              <tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#666;vertical-align:top">Message</td><td style="padding:10px 0;white-space:pre-wrap">${message}</td></tr>
            </table>
          </div>
          <div style="padding:16px 32px;background:#0c0e14;text-align:center">
            <p style="color:#555;font-size:12px;margin:0">Hit "Reply" to respond directly to ${name}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
