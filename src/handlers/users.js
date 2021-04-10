const userModel = require('../models/users');
const { writeResponse, writeError } = require('../helper/response');

const registerUser = (req, res) => {
    const data = { ...req.body };
    userModel
        .registerUser(data)
        .then((result) => {
            if (result === 1) {
                response = {
                    success: true,
                    message: 'Your account has been successfully registered',
                };
                res.status(201).json(response);
            } else if (result === -1) {
                response = {
                    success: false,
                    conflict: 'username',
                    message: 'Username is already taken',
                };
                res.status(409).json(response);
            } else if (result === 0) {
                response = {
                    success: false,
                    conflict: 'email',
                    message: 'Email is already taken',
                };
                res.status(409).json(response);
            }
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
                writeResponse(res, null, 200, result);
            } else if (!result) {
                response = {
                    success: false,
                    message: 'Username or Password is wrong',
                };
                res.status(401).json(response);
            }
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const updateUserById = (req, res) => {
    const { files } = req;
    const avatar = `/images/${files[0].filename}`;
    const data = { ...req.body, avatar };
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

module.exports = {
    registerUser,
    loginUser,
    updateUserById,
    getUserById,
};
