const Router = require('express').Router();
const {
    // getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
    getMySchedule,
    getCourseMember,
} = require('../handlers/instructor');

const authorize = require('../middlewares/authorize');
// Router.get('/member-progress/:id', getMemberProgress); //getMembersProgress

Router.get('/my-course', authorize.instructorOnly, getMyCourse);

Router.get('/course-member/:course', authorize.instructorOnly, getCourseMember);

Router.get('/my-schedule', authorize.instructorOnly, getMySchedule);

Router.get(
    '/member-progress/:course/:user',
    authorize.instructorOnly,
    getSpesificMemberProgress
);

module.exports = Router;
