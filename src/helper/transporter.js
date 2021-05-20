const nodemailer = require('nodemailer');
const { ADMIN_USER, ADMIN_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        user: ADMIN_USER,
        pass: ADMIN_PASSWORD,
    },
});

const otpGenerator = () => {
    let otp = Math.floor(1000 + Math.random() * 9000);
    otp = parseInt(otp);
    return otp;
};

module.exports = {
    transporter,
    otpGenerator,
};
