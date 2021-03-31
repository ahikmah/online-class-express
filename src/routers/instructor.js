const Router = require('express').Router();
const {
    getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
} = require('../handlers/instructor');

// Router.get('/member-progress/:id', getMemberProgress); //getMembersProgress
Router.get('/member-progress/:course/:user', getSpesificMemberProgress);

Router.get('/mycourse/:id', getMyCourse);

module.exports = Router;
