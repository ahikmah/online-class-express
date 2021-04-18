const Router = require('express').Router();

const {
    getCourseCategory,
    postCourseCategory,
    updateCourseCategory,
    updateCourse,
    createNewCourse,
    createNewChapter,
    registerCourse,
    submitScore,
    getAllCourse,
    getCourseDetail,
} = require('../handlers/course');

const authorize = require('../middlewares/authorize');
const multerUpload = require('../middlewares/upload');

// GET ALL, SEARCH, FILTER, AND SORT COURSE
Router.get('/', authorize.authUser, getAllCourse);

// CREATE NEW COURSE
Router.post('/', authorize.instructorOnly, multerUpload.any(), createNewCourse);
Router.patch(
    '/:id',
    authorize.instructorOnly,
    multerUpload.any(),
    updateCourse
);

Router.post('/new-chapter', authorize.instructorOnly, createNewChapter);

// REGISTER COURSE
Router.post('/register', authorize.studentOnly, registerCourse);

// GET COURSE DETAIL BY ID
Router.get('/detail/:id', getCourseDetail);

// COURSE CATEGORY
Router.get('/categories', getCourseCategory);
Router.post(
    '/categories',
    authorize.instructorOnly,
    multerUpload.any(),
    postCourseCategory
);
Router.patch(
    '/categories/:id',
    authorize.instructorOnly,
    multerUpload.any(),
    updateCourseCategory
);

Router.patch(
    '/scoring/:chapter/:enroll',
    authorize.instructorOnly,
    submitScore
);

module.exports = Router;
