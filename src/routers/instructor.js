const Router = require('express').Router();
const {
    // getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
    getMySchedule,
} = require('../handlers/instructor');

// Router.get('/member-progress/:id', getMemberProgress); //getMembersProgress
Router.get('/member-progress/:course/:user', getSpesificMemberProgress);

Router.get('/mycourse/:id', getMyCourse);

Router.get('/my-schedule/:id', getMySchedule);

module.exports = Router;
