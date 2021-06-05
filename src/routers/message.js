const Router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { getAllUser } = require('../handlers/message');

// GET LIST OF STUDENT ACCOUNT
Router.get('/', authorize.authUser, getAllUser);
module.exports = Router;
