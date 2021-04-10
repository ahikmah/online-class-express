const Router = require('express').Router();

const {
    getCourseCategory,
    createNewCourse,
    registerCourse,
    submitScore,
    filterCourse,
    getCourseDetail,
} = require('../handlers/course');

const authorize = require('../middlewares/authorize');

const multerUpload = require('../middlewares/upload');

// CREATE NEW COURSE
Router.post('/', authorize.instructorOnly, multerUpload.any(), createNewCourse);

// FILTER COURSE
Router.get('/', authorize.studentOnly, filterCourse);

// REGISTER COURSE
Router.post('/register', authorize.studentOnly, registerCourse);

Router.patch(
    '/scoring/:chapter/:enroll',
    authorize.instructorOnly,
    submitScore
);

Router.get('/categories', getCourseCategory);

Router.get('/detail/:id', getCourseDetail);

module.exports = Router;
