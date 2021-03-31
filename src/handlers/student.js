const studentModel = require('../models/student');
const { writeResponse, writeError } = require('../helper/response');
const getMyClass = (req, res) => {
    studentModel
        .getMyClass()
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMyClassByIdUser = (req, res) => {
    const idUser = req.params.id;
    studentModel
        .getMyClassByIdUser(idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getAllSchedule = (req, res) => {
    const idUser = req.params.id;
    studentModel
        .getAllSchedule(idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

module.exports = {
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
};
