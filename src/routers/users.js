const Router = require('express').Router();
const {
    getAllUsers,
    getUserRoleById,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser,
} = require('../handlers/users');

// const express = require('express');

// GET ALL USER
// Router.get('/', getAllUsers);

Router.post('/login', loginUser);

// Router.get('/role/:id', getUserRoleById);

// CREATE USER
Router.post('/', createUser);

// READ SINGLE USER
// Router.get('/:id', getUserById);

// UPDATE USER
Router.put('/:id', updateUserById);

// DELETE USER
// Router.delete('/:id', deleteUserById);

module.exports = Router;
