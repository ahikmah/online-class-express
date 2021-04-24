const dbMysql = require('../database/mySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = { registerUser, loginUser, logoutUser };
