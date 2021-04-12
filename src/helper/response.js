const { response } = require('express');

const writeResponse = (res, header, status, result) => {
    let response;
    if (header) {
        res.header(header);
    }
    res.status(status).json(result);
};

const writeError = (res, status, err) => {
    res.status(status).json(err);
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
