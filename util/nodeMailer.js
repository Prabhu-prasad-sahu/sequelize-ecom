const nodemailer = require("nodemailer")

const sendMail = (data, req, rsp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false, // only true for port no 456 otherwise false
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    transporter.sendMail({
        from: "pp411100@gmail.com", // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.htm, // html body
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: %s", info.messageId);
        }

    })
}


module.exports = sendMail