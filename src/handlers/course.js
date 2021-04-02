const courseModel = require('../models/course');
const { writeResponse, writeError } = require('../helper/response');

const searchCourseAndSort = (req, res) => {
    const query = req.query.sort;
    const search = '%' + req.query.q + '%';
    search === '%undefined%'
        ? courseModel
              .getAllCourse(query)
              .then((result) => {
                  writeResponse(res, null, 200, result);
              })
              .catch((err) => {
                  writeError(res, 500, err);
              })
        : courseModel
              .searchCourseAndSort(query, search)
              .then((result) => {
                  writeResponse(res, null, 200, result);
              })
              .catch((err) => {
                  writeError(res, 500, err);
              });
};

const filterCourse = (req, res) => {
    const category = req.query.category;
    const level = req.query.level;
    const price = req.query.price;

    courseModel
        .filterCourse(category, level, price)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getCourseCategory = (req, res) => {
    courseModel
        .getCourseCategory()
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const createNewCourse = (req, res) => {
    const data = { ...req.body };
    courseModel
        .createNewCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
    // console.log(data);
};

const registerCourse = (req, res) => {
    const data = { ...req.body };
    courseModel
        .registerCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const submitScore = (req, res) => {
    const data = { ...req.body };
    const idChapter = req.params.id;
    courseModel
        .submitScore(data, idChapter)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
    console.log(data);
};

module.exports = {
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    filterCourse,
    submitScore,
};
