import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { email, message } = await request.json();

  // Валидация
  if (!email || !message) {
    return NextResponse.json(
      { error: "Все поля обязательны" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Сайт Geology" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Новое сообщение от ${email}`,
      text: message,
      html: `<div>
        <p>${message}</p>
        <p>От: ${email}</p>
      </div>`,
    });

    console.log("Письмо отправлено:", info.messageId);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Полная ошибка:", error);
    let errorMessage = 'Произошла неизвестная ошибка'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    return NextResponse.json(
      { error: `Ошибка отправки: ${errorMessage}` },
      { status: 500 }
    )
  }
}