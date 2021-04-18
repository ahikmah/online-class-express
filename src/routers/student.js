const Router = require('express').Router();
const {
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
    getMyProgress,
} = require('../handlers/student');
const authorize = require('../middlewares/authorize');

Router.get('/my-class', authorize.studentOnly, getMyClassByIdUser);

Router.get('/my-progress/:course', authorize.studentOnly, getMyProgress);

Router.get('/all-schedule', authorize.studentOnly, getAllSchedule);

module.exports = Router;
