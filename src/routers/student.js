const Router = require('express').Router();
const {
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
} = require('../handlers/student');
const authorize = require('../middlewares/authorize');

// Router.get('/myclass', getMyClass);

Router.get('/my-class/:id', authorize.studentOnly, getMyClassByIdUser);

Router.get('/all-schedule/:id', authorize.studentOnly, getAllSchedule);
// Router.get('/my-schedule/:id', getAllSchedule);

module.exports = Router;
