import { EMAIL_USER, EMAIL_PASSWORD } from '@/config';
import * as nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  debug: true,
});

async function sendMail(transporter, mailOptions) {
  try {
    const mail = await transporter.sendMail(mailOptions);
    //   console.log(mail);
    if (mail) return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export default async function sendResetLink(email: string, link: string) {
  const emailSubject = 'Action Needed: Forgot password ✔';
  const to = email;
  const dynamicHtml = `<b>We have received a request to reset your password.<br><br> If this was you, please use the reset password link provided below to proceed:<br>
  Reset Password Link: <strong><em>${link}</em></strong><br><br></b>`;

  const mailOptions = {
    from: {
      name: 'Composite',
      address: EMAIL_USER,
    },
    to: to,
    subject: emailSubject,
    text: 'Forgot Password',
    html: dynamicHtml,
  };

  // send mail
  return await sendMail(transporter, mailOptions);
}
