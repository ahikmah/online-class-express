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
module.exports = {
    writeResponse,
    writeError,
};
