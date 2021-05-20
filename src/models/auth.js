const dbMysql = require('../database/mySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { otpGenerator } = require('../helper/transporter');

const registerUser = (data) => {
    const checkUser = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const checkData = [data.email, data.username];

    const qs = 'INSERT INTO users SET ?';

    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, 10, (err, encryptedPass) => {
            if (err) return reject({ status: 500 });

            data.password = encryptedPass;

            dbMysql.query(checkUser, checkData, (err, result) => {
                if (err) {
                    reject({ status: 500 });
                } else {
                    if (result.length > 0) {
                        if (data.username === result[0].username) {
                            reject({
                                success: false,
                                conflict: 'username',
                                msg: 'Username is already taken',
                                status: 409,
                            });
                        } else if (data.email === result[0].email) {
                            reject({
                                success: false,
                                conflict: 'email',
                                msg: 'Email is already taken',
                                status: 409,
                            });
                        }
                    } else if (result.length === 0) {
                        dbMysql.query(qs, data, (err, result) => {
                            if (err) {
                                reject({ status: 500 });
                            } else {
                                resolve(result);
                            }
                        });
                    }
                }
            });
        });
    });
};

const loginUser = (data) => {
    const qs = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const qsTokenInsert = 'INSERT INTO whitelist_token (token) VALUES (?)';
    const loginData = [data.email, data.username];
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, loginData, (err, result) => {
            // console.log(result);
            if (err) {
                reject({ status: 500 });
            }

            if (result.length === 0) {
                return reject({
                    success: false,
                    msg: 'This account does not exist',
                    status: 401,
                });
            } else {
                bcrypt.compare(
                    data.password,
                    result[0].password,
                    (err, isValid) => {
                        if (err) return reject(err);
                        if (!isValid) {
                            return reject({
                                status: 401,
                                success: false,
                                msg: 'Username or password is wrong',
                            });
                        }

                        const payload = {
                            id: result[0].id,
                            username: result[0].username,
                            role:
                                result[0].role === 1 ? 'instructor' : 'student',
                        };

                        const options = {
                            expiresIn: process.env.EXPIRE,
                            issuer: process.env.ISSUER,
                        };

                        jwt.sign(
                            payload,
                            process.env.SECRET_KEY,
                            options,
                            (err, token) => {
                                if (err) return reject({ status: 500 });
                                // resolve(token);
                                console.log(token);
                                dbMysql.query(
                                    qsTokenInsert,
                                    token,
                                    (err, _) => {
                                        // console.log(result);
                                        if (err) {
                                            reject({ status: 500 });
                                        } else {
                                            resolve(token);
                                        }
                                    }
                                );
                            }
                        );
                    }
                );
            }
        });
    });
};

const logoutUser = (token) => {
    const qs = `DELETE FROM whitelist_token WHERE token = ?`;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, token, (err, result) => {
            if (err) return reject({ status: 500 });
            resolve(result);
        });
    });
};

const sendOTP = (email) => {
    const qs = 'SELECT id, username FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, email, (err, result) => {
            if (err) return reject({ status: 500 });
            if (result.length === 0) {
                return reject({
                    success: false,
                    msg: 'This account does not exist',
                    status: 401,
                });
            } else {
                const otp = otpGenerator();
                const generateOTP = 'UPDATE users SET otp=? WHERE id=?';
                dbMysql.query(
                    generateOTP,
                    [otp, result[0].id],
                    (err, result) => {
                        if (err) {
                            return reject({ status: 500 });
                        } else {
                            console.log(otp);
                            resolve(otp);
                        }
                    }
                );
            }
        });
    });
};

const verifyOTP = (data) => {
    const { email, otp } = data;
    const qs = 'SELECT id FROM users WHERE email = ? && otp = ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [email, otp], (err, result) => {
            if (err) {
                return reject({ status: 500 });
            } else if (result.length === 0) {
                return reject({
                    success: false,
                    msg: 'You may have entered the wrong info. Please check and try again',
                    status: 401,
                });
            } else {
                resolve(result);
            }
        });
    });
};

const resetPassword = (id, password) => {
    const qs = 'UPDATE users SET password = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, encryptedPass) => {
            if (err) return reject({ status: 500 });

            password = encryptedPass;
            dbMysql.query(qs, [password, id], (err, result) => {
                if (err) {
                    return reject({ status: 500 });
                } else if (result.length === 0) {
                    return reject({
                        success: false,
                        msg: 'You may have entered the wrong info. Please check and try again',
                        status: 401,
                    });
                } else {
                    resolve(result);
                }
            });
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    sendOTP,
    verifyOTP,
    resetPassword,
};
