const userModel = require('../models/users');
const { writeResponse, writeError } = require('../helper/response');
const jwt = require('jsonwebtoken');

const updateUserById = (req, res) => {
    console.log(req.token__userid);
    const { files } = req;
    const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
    const idUser = req.token__userid;
    userModel
        .updateUserById(data, idUser)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: 'true',
                message: 'Profile update successfully!',
            });
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const getUserById = (req, res) => {
    const idUser = req.token__userid;
    userModel
        .getUserById(idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

module.exports = {
    updateUserById,
    getUserById,
};
