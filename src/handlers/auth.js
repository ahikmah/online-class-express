const authModel = require('../models/auth');
const { writeResponse, writeError } = require('../helper/response');

const registerUser = (req, res) => {
    const data = { ...req.body };
    authModel
        .registerUser(data)
        .then((result) => {
            if (result) {
                writeResponse(res, null, 201, {
                    success: true,
                    message: 'Your account has been successfully registered',
                });
            }
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const loginUser = (req, res) => {
    const data = { ...req.body };
    authModel
        .loginUser(data)
        .then((result) => {
            if (result) {
                writeResponse(res, null, 200, { success: true, token: result });
            }
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
    registerUser,
    loginUser,
};
