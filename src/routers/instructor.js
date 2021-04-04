const Router = require('express').Router();
const {
    // getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
    getMySchedule,
} = require('../handlers/instructor');

// Router.get('/member-progress/:id', getMemberProgress); //getMembersProgress

Router.get('/my-course/:id', getMyCourse);

Router.get('/my-schedule/:id', getMySchedule);

Router.get('/member-progress/:course/:user', getSpesificMemberProgress);

module.exports = Router;
