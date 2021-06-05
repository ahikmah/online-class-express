const messageModel = require('../models/message');
const { writeResponse, writeError } = require('../helper/response');

const getAllUser = (req, res) => {
    messageModel
        .getAllUser()
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
    getAllUser,
};
