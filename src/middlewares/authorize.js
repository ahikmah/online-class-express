const jwt = require('jsonwebtoken');
const { writeError } = require('../helper/response');
const dbMysql = require('../database/mySql');
// const mysql = require('mysql');

const instructorOnly = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];
    let isAllowed = false;

    const options = {
        issuer: process.env.ISSUER,
    };

    qs = 'SELECT * FROM whitelist_token WHERE token = ?';
    dbMysql.query(qs, token, (err, result) => {
        if (err) {
            writeError(res, 500, err);
        } else {
            if (result.length > 0) {
                isAllowed = true;
                jwt.verify(
                    token,
                    process.env.SECRET_KEY,
                    options,
                    (err, decodedToken) => {
                        if (err) {
                            if (err.name === 'TokenExpiredError')
                                return writeError(res, 401, err);
                            if (err.name === 'JsonWebTokenError')
                                return writeError(res, 400, err);
                        } else {
                            if (
                                decodedToken.role === 'instructor' &&
                                isAllowed
                            ) {
                                req.token__userid = decodedToken.id;
                                req.token = token;
                                return next();
                            }
                            writeError(res, 403, null);
                        }
                    }
                );
            } else if (!isAllowed) {
                writeError(res, 401, { message: 'Please login again' });
            }
        }
    });
};

const studentOnly = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];
    let isAllowed = false;

    const options = {
        issuer: process.env.ISSUER,
    };
    qs = 'SELECT * FROM whitelist_token WHERE token= ?';
    dbMysql.query(qs, token, (err, result) => {
        if (err) {
            writeError(res, 500, err);
        } else {
            if (result.length > 0) {
                isAllowed = true;
                jwt.verify(
                    token,
                    process.env.SECRET_KEY,
                    options,
                    (err, decodedToken) => {
                        if (err) {
                            if (err.name === 'TokenExpiredError')
                                return writeError(res, 401, err);
                            if (err.name === 'JsonWebTokenError')
                                return writeError(res, 400, err);
                        } else {
                            if (decodedToken.role === 'student' && isAllowed) {
                                req.token__userid = decodedToken.id;
                                req.token = token;
                                return next();
                            }
                            writeError(res, 403, null);
                        }
                    }
                );
            } else if (!isAllowed) {
                writeError(res, 401, {
                    message: 'Please login again',
                });
            }
        }
    });
};

const authUser = (req, res, next) => {
    const token = req.header('x-access-token').split(' ')[1];
    let isAllowed = false;

    const options = {
        issuer: process.env.ISSUER,
    };

    qs = 'SELECT * FROM whitelist_token WHERE token = ?';
    dbMysql.query(qs, token, (err, result) => {
        if (err) {
            writeError(res, 500, err);
        } else {
            if (result.length > 0) {
                isAllowed = true;
                jwt.verify(
                    token,
                    process.env.SECRET_KEY,
                    options,
                    (err, decodedToken) => {
                        if (err) {
                            if (err.name === 'TokenExpiredError')
                                return writeError(res, 401, err);
                            if (err.name === 'JsonWebTokenError')
                                return writeError(res, 400, err);
                        } else {
                            console.log(isAllowed);
                            if (decodedToken.id && isAllowed) {
                                req.token__userid = decodedToken.id;
                                req.token = token;
                                return next();
                            }
                            writeError(res, 403, null);
                        }
                    }
                );
            } else if (!isAllowed) {
                writeError(res, 401, {
                    message: 'Please login again',
                });
            }
        }
    });
};

module.exports = { instructorOnly, studentOnly, authUser };
