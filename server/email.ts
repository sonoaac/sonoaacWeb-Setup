import nodemailer from 'nodemailer';

const BUSINESS_EMAIL = 'sonoaac@gmail.com';

function createTransporter() {
  const user = process.env.GMAIL_USER ?? BUSINESS_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendContactEmail(name: string, email: string, message: string) {
  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.GMAIL_USER ?? BUSINESS_EMAIL,
    to: BUSINESS_EMAIL,
    replyTo: email,
    subject: `New message from ${name} — Sonoaac`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> <a href="mailto:${email}">${email}</a></p><p><b>Message:</b></p><p style="white-space:pre-wrap">${message}</p>`,
  });

  const smsTo = process.env.ADMIN_PHONE_SMS;
  if (smsTo) {
    await transporter.sendMail({
      from: process.env.GMAIL_USER ?? BUSINESS_EMAIL,
      to: smsTo,
      subject: '',
      text: `SNC contact: ${name} (${email}): ${message.slice(0, 120)}`,
    });
  }
}

export async function sendAdminNotification(subject: string, body: string) {
  const transporter = createTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.GMAIL_USER ?? BUSINESS_EMAIL,
    to: BUSINESS_EMAIL,
    subject,
    text: body,
  });

  const smsTo = process.env.ADMIN_PHONE_SMS;
  if (smsTo) {
    await transporter.sendMail({
      from: process.env.GMAIL_USER ?? BUSINESS_EMAIL,
      to: smsTo,
      subject: '',
      text: body.slice(0, 160),
    });
  }
}
