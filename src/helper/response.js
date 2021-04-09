const { response } = require('express');

const writeResponse = (res, header, status, result) => {
    let response;
    if (header) {
        res.header(header);
    }

    if (result.affectedRows === 0) {
        response = {
            success: false,
            result,
        };
        status = 304;
    } else if (result) {
        response = {
            success: true,
            result,
        };
    } else {
        status = 204;
    }
    res.status(status).json(response);
};

const writeError = (res, status, err) => {
    res.status(status).json(new Error(err));
};

const writeResponsePaginated = (res, status, info, result) => {
    let response = {};
    if (result) {
        response = {
            ...response,
            result,
        };
    }
    if (info) {
        response = {
            info,
            ...response,
        };
    }
    res.status(status).json(response);
};
module.exports = {
    writeResponse,
    writeError,
    writeResponsePaginated,
};
