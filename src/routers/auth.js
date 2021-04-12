const Router = require('express').Router();
const { registerUser, loginUser } = require('../handlers/auth');

// REGISTER
Router.post('/', registerUser);

// LOGIN
Router.post('/login', loginUser);

module.exports = Router;
