const Router = require('express').Router();
const {
    registerUser,
    loginUser,
    updateUserById,
    getUserById,
} = require('../handlers/users');
const multerUpload = require('../middlewares/upload');

// REGISTER USER
Router.post('/', registerUser);

// UPDATE USER BY ID
Router.patch('/:id', multerUpload.any(), updateUserById);

// GET USER BY ID
Router.get('/:id', getUserById);

// LOGIN
Router.post('/login', loginUser);

module.exports = Router;
