const Router = require('express').Router();
const {
    registerUser,
    loginUser,
    updateUserById,
    getUserById,
} = require('../handlers/users');

// REGISTER USER
Router.post('/', registerUser);

// LOGIN
Router.post('/login', loginUser);

// UPDATE USER BY ID
Router.patch('/:id', updateUserById);

// GET USER BY ID
Router.get('/:id', getUserById);

module.exports = Router;
