const dbMysql = require('../database/mySql');
const md5 = require('md5');

const registerUser = (data) => {
    const checkUser = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const qs = 'INSERT INTO users SET ?';
    const checkData = [data.email, data.username];
    data.password = md5(data.password);

    return new Promise((resolve, reject) => {
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
};

const loginUser = (data) => {
    const qs = `SELECT * FROM users WHERE email = ? OR username = ? AND password= ?`;
    data.password = md5(data.password);
    const loginData = [data.email, data.username, data.password];
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, loginData, (err, result) => {
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

const updateUserById = (data, idUser) => {
    const qs = 'UPDATE users SET ? WHERE id = ? ';
    const updated = [data, idUser];
    if (data.password) data.password = md5(data.password);

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, updated, (err, result) => {
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
