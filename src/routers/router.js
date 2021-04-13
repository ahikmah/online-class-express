const Router = require('express').Router();
const usersRouter = require('./users');
const coursesRouter = require('./course');
const instructorRouter = require('./instructor');
const studentRouter = require('./student');
const authRouter = require('./auth');
////////////////////////////////////

Router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET,PATCH,POST,DELETE,OPTIONS'
        );
        res.header('Access-Control-Allow-Headers', 'x-access-token');
        return res.sendStatus(200);
    }
    next();
    // res.send(200);
});

Router.get('/ping', (req, res) => res.send(`<h1>pong</h1>`));

// AUTH
Router.use('/data/auth', authRouter);

// USERS
Router.use('/data/users', usersRouter);

// COURSE
Router.use('/data/courses', coursesRouter);

// INSTRUCTOR
Router.use('/data/instructor', instructorRouter);

// STUDENT
Router.use('/data/student', studentRouter);

module.exports = Router;
