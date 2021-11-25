const nodemailer = require("nodemailer");
const senderInfo = require("../senderInfo.json");
// 메일발송 객체
const mailSender = async (email, sendData) => {
  try {
    const mailConfig = {
      serivce: "Naver",
      host: "smtp.naver.com",
      port: 587,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass,
      },
    };
    const transporter = nodemailer.createTransport(mailConfig);
    const mailOption = {
      from: senderInfo.user,
      to: email,
      subject: sendData.subject,
      html: sendData.html,
    };
    const info = await transporter.sendMail(mailOption);
    return info;
  } catch (err) {
    console.log(err);
  }
};
module.exports = mailSender;
