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

// GET ALL COURSE, SEARCHING, SORTING
Router.get('/', searchCourseAndSort);

// CREATE NEW COURSE
Router.post('/', createNewCourse);

// FILTER COURSE
Router.get('/filter', filterCourse);

// REGISTER COURSE
Router.post('/register', registerCourse);

Router.patch('/scoring/:chapter/:enroll', submitScore);

Router.get('/categories', getCourseCategory);

Router.get('/detail/:id', getCourseDetail);

module.exports = Router;
