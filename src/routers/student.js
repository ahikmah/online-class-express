const Router = require('express').Router();
const {
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
} = require('../handlers/student');

// Router.get('/myclass', getMyClass);

Router.get('/myclass/:id', getMyClassByIdUser);

Router.get('/all-schedule/:id', getAllSchedule);
// Router.get('/my-schedule/:id', getAllSchedule);

module.exports = Router;
