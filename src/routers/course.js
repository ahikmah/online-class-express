const Router = require('express').Router();

const {
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    submitScore,
    filterCourse,
} = require('../handlers/course');

// GET ALL COURSE, SEARCHING, SORTING
Router.get('/', searchCourseAndSort);

// CREATE NEW COURSE
Router.post('/', createNewCourse);

// FILTER COURSE
Router.get('/filter', filterCourse);

Router.get('/categories', getCourseCategory);

// REGISTER COURSE
Router.post('/register', registerCourse);

Router.patch('/scoring/:id', submitScore);

module.exports = Router;
