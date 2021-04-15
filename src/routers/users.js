const Router = require('express').Router();
const { updateUserById, getUserById } = require('../handlers/users');
const authorize = require('../middlewares/authorize');
const multerUpload = require('../middlewares/upload');

// UPDATE USER BY ID
Router.patch('/', authorize.authUser, multerUpload.any(), updateUserById);

// GET USER BY ID
Router.get('/', authorize.authUser, getUserById);

module.exports = Router;
