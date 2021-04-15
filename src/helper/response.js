const { response } = require('express');

const writeResponse = (res, header, status, result) => {
    let response;
    if (header) {
        res.header(header);
    }
    if (result) {
        response = {
            result,
        };
    }
    res.status(status).json(response);
};

const writeError = (res, status, error) => {
    let response;
    if (error) {
        response = {
            error,
        };
    }
    res.status(status).json(response);
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
