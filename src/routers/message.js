const Router = require('express').Router();
const authorize = require('../middlewares/authorize');
const {
    getAllUser,
    createRoom,
    sendMessage,
    messageHistory,
    messageList,
    roomInfo,
} = require('../handlers/message');

// GET LIST OF STUDENT ACCOUNT
Router.get('/', authorize.authUser, getAllUser);

// Create a new chat room
Router.post('/', authorize.authUser, createRoom);

// Send a message
Router.post('/send', authorize.authUser, sendMessage);

// Get message history by room id
Router.get('/history/:room_id', authorize.authUser, messageHistory);

// Get message list by user id
Router.get('/list', authorize.authUser, messageList);

// Get message list by user id
Router.get('/room/:room_id', authorize.authUser, roomInfo);

module.exports = Router;
