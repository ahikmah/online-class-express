const jwt = require('jsonwebtoken');
const { writeError } = require('../helper/response');

const instructorOnly = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];

    const options = {
        issuer: process.env.ISSUER,
    };

    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return writeError(res, 401, err);
            if (err.name === 'JsonWebTokenError')
                return writeError(res, 400, err);
        } else {
            if (decodedToken.role === 'instructor') {
                req.token = decodedToken.id;
                return next();
            }
            writeError(res, 403, null);
        }
    });
};

const studentOnly = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];

    const options = {
        issuer: process.env.ISSUER,
    };

    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return writeError(res, 401, err);
            if (err.name === 'JsonWebTokenError')
                return writeError(res, 400, err);
        } else {
            if (decodedToken.role === 'student') {
                req.token = decodedToken.id;
                return next();
            }
            writeError(res, 403, null);
        }
    });
};

const authUser = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];

    const options = {
        issuer: process.env.ISSUER,
    };

    jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return writeError(res, 401, err);
            if (err.name === 'JsonWebTokenError')
                return writeError(res, 400, err);
        } else {
            if (decodedToken.id) {
                req.token = decodedToken.id;
                return next();
            }
            writeError(res, 403, null);
        }
    });
};

module.exports = { instructorOnly, studentOnly, authUser };
