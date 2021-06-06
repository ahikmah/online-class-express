const Router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { getAllUser, createRoom } = require('../handlers/message');

// GET LIST OF STUDENT ACCOUNT
Router.get('/', authorize.authUser, getAllUser);

Router.post('/', authorize.authUser, createRoom);

module.exports = Router;
