import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs"


// Looking to send emails in production? Check out our Email API/SMTP product!





export const sendEmail = async ({ email, emailType, userId }) => {

    try {
      console.log("inside sendEmail", email, emailType, userId)

        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        console.log("hashed Token", hashedToken)

        if (emailType === "VERIFY") {
          console.log("inside the if block if type is verify")
          await User.findByIdAndUpdate(userId, 
              {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
      } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
              {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
      }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
        console.log("transporter", transport)

        const info = {
            from: 'abhishekbhattarai@email.com',
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "verify your email" : "reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      h1 {
        font-size: 24px;
        color: #333;
      }
      p {
        font-size: 16px;
        color: #666;
        line-height: 1.5;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        margin: 20px 0;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verify Your Email</h1>
      <p>
        Thank you for signing up! Please confirm your email address by clicking the
        button below to complete your registration.
      </p>
      <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">Verify Email</a>
      <p class="footer">
        If you didn’t create this account, please ignore this email.
      </p>
    </div>
  </body>
</html>
`
        };

        const response = transport.sendMail(info,function(error, info){
          if (error) {
            console.log("Error:" ,error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        console.log("response of mailer",response)
        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}