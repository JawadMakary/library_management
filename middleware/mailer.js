const nodemailer = require('nodemailer');
require("dotenv").config();

//VERY IMPORTANT TO PUT THE ACCOUNT IN USE TO ALLOW LESS SECURE APPLICATION TO CONNECT
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });


function sendEmail(mailOptions){

    mailOptions['from'] = process.env.EMAIL;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    });
}

module.exports = sendEmail;

