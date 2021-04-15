const Router = require('express').Router();
const {
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
} = require('../handlers/student');
const authorize = require('../middlewares/authorize');

Router.get('/my-class', authorize.studentOnly, getMyClassByIdUser);

Router.get('/all-schedule', authorize.studentOnly, getAllSchedule);

module.exports = Router;
