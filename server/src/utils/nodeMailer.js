// utils/nodemailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export async function sendPasswordEmail(email, password) {
  const mailOptions = {
    from: `"Niraamayae Support" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: "Welcome to Niraamayae - Your Account Details",
    text: `Hello,\n\nYour account has been created successfully.\nYour temporary password is: ${password}\n\nPlease log in and change your password.\n\nRegards,\nNiraamayae Team`,
  };

  return transporter.sendMail(mailOptions);
}
