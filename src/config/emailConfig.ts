import nodemailer from "nodemailer";
import config from "../config";
var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
