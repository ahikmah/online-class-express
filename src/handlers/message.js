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

const createRoom = (req, res) => {
    const data = req.body;
    messageModel
        .createRoom(data)
        .then((result) => {
            console.log(result);
            writeResponse(res, null, 200, {
                success: true,
                message: 'Room has been created',
            });
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};
module.exports = {
    getAllUser,
    createRoom,
};
