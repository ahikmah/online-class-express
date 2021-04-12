const Router = require('express').Router();
const { updateUserById, getUserById } = require('../handlers/users');
const multerUpload = require('../middlewares/upload');

// UPDATE USER BY ID
Router.patch('/:id', multerUpload.any(), updateUserById);

// GET USER BY ID
Router.get('/:id', getUserById);

module.exports = Router;
