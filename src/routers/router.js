const Router = require('express').Router();
const usersRouter = require('./users');
const coursesRouter = require('./course');
const instructorRouter = require('./instructor');
const studentRouter = require('./student');
////////////////////////////////////
Router.get('/ping', (req, res) => res.send(`<h1>pong</h1>`));

// USERS
Router.use('/data/users', usersRouter);

// COURSE
Router.use('/data/courses', coursesRouter);

// INSTRUCTOR
Router.use('/data/instructor', instructorRouter);

// STUDENT
Router.use('/data/student', studentRouter);

module.exports = Router;
