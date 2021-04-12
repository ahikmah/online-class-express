const userModel = require('../models/users');
const { writeResponse, writeError } = require('../helper/response');

const updateUserById = (req, res) => {
    const { files } = req;
    const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
    const idUser = req.params.id;
    userModel
        .updateUserById(data, idUser)
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

const getUserById = (req, res) => {
    const idUser = req.params.id;
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
