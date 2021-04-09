const Router = require('express').Router();

const {
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    submitScore,
    filterCourse,
    getCourseDetail,
} = require('../handlers/course');

const authorize = require('../middlewares/authorize');

// GET ALL COURSE, SEARCHING, SORTING
Router.get('/', searchCourseAndSort);

// CREATE NEW COURSE
Router.post('/', authorize.instructorOnly, createNewCourse);

// FILTER COURSE
Router.get('/filter', authorize.studentOnly, filterCourse);

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
