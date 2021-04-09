const instructorModel = require('../models/instructor');
const { writeResponse, writeError } = require('../helper/response');
const getMemberProgress = (req, res) => {
    const idCourse = req.params.id;
    instructorModel
        .getMemberProgress(idCourse)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getSpesificMemberProgress = (req, res) => {
    const idCourse = req.params.course;
    const idUser = req.params.user;

    instructorModel
        .getSpesificMemberProgress(idCourse, idUser)
        .then((result) => {
            // console.log(result);
            result.map((item) => {
                // console.log(item.score);
                if (item.score) {
                    console.log('number');
                } else if (item.score === 0) {
                    console.log('nol');
                } else {
                    console.log('unfinished');
                }
            });
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMyCourse = (req, res) => {
    const idUser = req.params.id;
    instructorModel
        .getMyCourse(idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMySchedule = (req, res) => {
    const idUser = req.params.id;
    const day = req.query.day;

    instructorModel
        .getMySchedule(idUser, day)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

module.exports = {
    getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
    getMySchedule,
};
