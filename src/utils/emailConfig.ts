import nodemailer from "nodemailer";
import config from "../config";
var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: config.email,
    pass: config.email_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
