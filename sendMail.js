const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
    }
});


const sendMail = async (toEmail, formData) => {
    const mailOptions = {
        from: {
            name: "GlowUp Clinic",
            address: process.env.USER
        },
        to: toEmail,

        subject: "Appointment Confirmation",

        text: `Hello ${formData["full-name"]},\n\nThank you for scheduling an appointment. We have received the following details:\n\nDate of Birth: ${formData["dob"]}\nGender: ${formData["gender"]}\nPhone: ${formData["phone"]}\nEmail: ${formData["email"]}\nAppointment Date: ${formData["appointment_date"]}\nReason: ${formData["reason"]}\n\nBest regards,\nManoj`,

        html: `<b>Hello ${formData["full-name"]},</b><br><br>Thank you for scheduling an appointment. We have received the following details:<br><br>Date of Birth: ${formData["dob"]}<br>Gender: ${formData["gender"]}<br>Phone: ${formData["phone"]}<br>Email: ${formData["email"]}<br>Appointment Date: ${formData["appointment_date"]}<br>Reason: ${formData["reason"]}<br><br>Best regards,<br>Manoj`,

    };


    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail has been sent");
    } catch (error) {
        console.error("Error sending mail:", error);
    }
}

module.exports = sendMail;