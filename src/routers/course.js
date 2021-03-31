const express = require('express');
const Router = require('express').Router();

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });

Router.use(jsonParser);
Router.use(urlEncodedParser);

const {
    getAllCourse,
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    submitScore,
} = require('../handlers/course');

Router.get('/', getAllCourse);

Router.get('/search', searchCourseAndSort);

Router.get('/categories', getCourseCategory);

// CREATE NEW COURSE
Router.post('/new', createNewCourse); // endpoint gapake new

// REGISTER COURSE
Router.post('/register', registerCourse);

Router.put('/scoring/:id', submitScore);

module.exports = Router;
