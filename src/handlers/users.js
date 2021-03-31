const userModel = require('../models/users');
const { writeResponse, writeError } = require('../helper/response');

const getAllUsers = (req, res) => {
    const query = req.query;
    userModel
        .getAllUsers(query.sort)
        .then((result) => {
            const headers = {
                'Access-Control-Allow-Origin': '*',
            };
            writeResponse(res, headers, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const loginUser = (req, res) => {
    const data = { ...req.body };
    userModel
        .loginUser(data)
        .then((result) => {
            if (result) {
                response = {
                    success: true,
                    message: 'Login success',
                };
                res.status(200).json(response);
            } else if (!result) {
                response = {
                    success: false,
                    message: 'Username or Password is wrong',
                };
                res.status(200).json(response);
            }
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getUserRoleById = (req, res) => {
    const role = req.params.id;
    let role_id;
    if (role === 'instructors') role_id = '1';
    if (role === 'students') role_id = '2';
    userModel
        .getUserRoleById(role_id)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const createUser = (req, res) => {
    const data = { ...req.body };
    userModel
        .createUser(data)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 304, err);
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
            writeError(res, 500, err);
        });
};

const updateUserById = (req, res) => {
    const data = { ...req.body };
    const idUser = req.params.id;
    userModel
        .updateUserById(data, idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const deleteUserById = (req, res) => {
    const idUser = req.params.id;
    userModel
        .deleteUserById(idUser)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

module.exports = {
    getAllUsers,
    getUserRoleById,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser,
};
