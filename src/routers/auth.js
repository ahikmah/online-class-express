const Router = require('express').Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    sendOTP,
    verifyOTP,
    resetPassword,
} = require('../handlers/auth');
const authorize = require('../middlewares/authorize');

// REGISTER
Router.post('/', registerUser);

// LOGIN
Router.post('/login', loginUser);

// LOGOUT
Router.delete('/logout', authorize.authUser, logoutUser);

// OTP and reset password
Router.post('/send-otp', sendOTP);
Router.post('/verify-otp', verifyOTP);
Router.patch('/reset-password', resetPassword);

module.exports = Router;
