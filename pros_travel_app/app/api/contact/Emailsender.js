// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// // javascript
// import dotenv from 'dotenv';
// import sendgrid from "@sendgrid/mail";

// dotenv.config();
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// // const sendgrid = require('@sendgrid/mail')
// // sendgrid.setApiKey(process.env.)

// const msg = {
//   to: 'zoubidaziroki@example.com', // Change to your recipient
//   from: 'zoubidaziroki@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sendgrid.send(msg).then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error) 
//   })

import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "zoubidaziroki@gmail.com", // Your email where you'll receive emails
      from: "zoubidaziroki@gmail.com", // your website email address here
      subject: `${req.body.subject}`,
      text: `${req.body.message}`,
      html: `${req.body.message}`,//`<div>You've got a mail</div>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;