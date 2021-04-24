const Router = require('express').Router();
const { registerUser, loginUser, logoutUser } = require('../handlers/auth');
const authorize = require('../middlewares/authorize');

// REGISTER
Router.post('/', registerUser);

// LOGIN
Router.post('/login', loginUser);

// LOGOUT
Router.delete('/logout', authorize.authUser, logoutUser);

module.exports = Router;
