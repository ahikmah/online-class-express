const dbMysql = require('../database/mySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = (data) => {
    const checkUser = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const checkData = [data.email, data.username];

    const qs = 'INSERT INTO users SET ?';

    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, 10, (err, encryptedPass) => {
            if (err) return reject(err);

            data.password = encryptedPass;

            dbMysql.query(checkUser, checkData, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        if (data.username === result[0].username) {
                            result = -1;
                            resolve(result);
                        } else if (data.email === result[0].email) {
                            result = 0;
                            resolve(result);
                        }
                    } else if (result.length === 0) {
                        dbMysql.query(qs, data, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                result = 1;
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
    const loginData = [data.email, data.username];
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, loginData, (err, result) => {
            if (err) return reject(err);

            if (result.length === 0) {
                result = false;
                return resolve(result);
            }
            bcrypt.compare(
                data.password,
                result[0].password,
                (err, isValid) => {
                    if (err) return reject(err);
                    if (!isValid) {
                        result = false;
                        return resolve(result);
                    }

                    const payload = {
                        username: result[0].username,
                        role: result[0].role === 1 ? 'instructor' : 'student',
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
                            if (err) return reject(err);
                            resolve(token);
                        }
                    );
                }
            );
        });
    });
};

const updateUserById = (data, idUser) => {
    const qs = 'UPDATE users SET ? WHERE id = ? ';
    const updated = [data, idUser];

    return new Promise((resolve, reject) => {
        data.password
            ? bcrypt.hash(data.password, 10, (err, encryptedPass) => {
                  if (err) return reject(err);

                  data.password = encryptedPass;

                  dbMysql.query(qs, updated, (err, result) => {
                      if (err) {
                          reject(err);
                      } else {
                          resolve(result);
                      }
                  });
              })
            : dbMysql.query(qs, updated, (err, result) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
    });
};

const getUserById = (idUser) => {
    const qs = 'SELECT * FROM users WHERE id = ? ';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, idUser, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    result = false;
                }
                resolve(result);
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
    updateUserById,
    getUserById,
};
