const authModel = require('../models/auth');
const { writeResponse, writeError } = require('../helper/response');

const { transporter } = require('../helper/transporter');
const nodemailer = require('nodemailer');
const registerUser = (req, res) => {
    const data = { ...req.body };
    authModel
        .registerUser(data)
        .then((result) => {
            if (result) {
                writeResponse(res, null, 201, {
                    success: true,
                    message: 'Your account has been successfully registered',
                });
            }
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const loginUser = (req, res) => {
    const data = { ...req.body };
    authModel
        .loginUser(data)
        .then((result) => {
            if (result) {
                writeResponse(res, null, 200, { success: true, token: result });
            }
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const logoutUser = (req, res) => {
    const token = req.token;
    authModel
        .logoutUser(token)
        .then((result) => {
            if (result) {
                writeResponse(res, null, 200, {
                    success: true,
                    message: 'you have successfully logged out',
                });
            }
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const sendOTP = (req, res) => {
    const { email } = req.body;
    authModel
        .sendOTP(email)
        .then((result) => {
            if (result) {
                console.log(result);
                let mailOptions = {
                    to: email,
                    subject: 'Online Class Authentication',
                    html:
                        '<h6>To authenticate, please use the following One Time Password (OTP):</h6>' +
                        `<h1>${result}</h1>` +
                        '<h6>Do not share this OTP with anyone. We take your account security very seriously.</h6>',
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log(
                        'Preview URL: %s',
                        nodemailer.getTestMessageUrl(info)
                    );
                });
                writeResponse(res, null, 200, {
                    success: 'true',
                    message: `OTP successfully sent to ${email}`,
                });
            }
        })
        .catch((err) => writeError(res, 500, err));
};

const verifyOTP = (req, res) => {
    const data = { ...req.body };
    authModel
        .verifyOTP(data)
        .then((result) => {
            console.log(result);
            if (result) {
                writeResponse(res, null, 200, {
                    success: 'true',
                    message: `OTP has been verified`,
                    idUser: result[0].id,
                });
            }
        })
        .catch((err) => {
            writeError(res, 500, {
                success: 'false',
                message: `Something wrong`,
            });
            console.log(err);
        });
};

const resetPassword = (req, res) => {
    const { id, password } = req.body;
    authModel
        .resetPassword(id, password)
        .then((result) => {
            console.log(result);
            if (result) {
                writeResponse(res, null, 200, {
                    success: 'true',
                    message: `Password changed!`,
                });
            }
        })
        .catch((err) => {
            writeError(res, 500, {
                success: 'false',
                message: `Something wrong`,
            });
            console.log(err);
        });
};
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    sendOTP,
    verifyOTP,
    resetPassword,
};
