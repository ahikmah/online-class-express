const dbMysql = require('../database/mySql');
const mysql = require('mysql');
const md5 = require('md5');

const getAllUsers = (q) => {
    const sort = ['ORDER BY'];
    const qs = q
        ? 'SELECT id, full_name AS name, username, IF(role=1,"Instructor", "Student") AS role, email, password FROM users ?'
        : 'SELECT id, full_name AS name, username, IF(role=1,"Instructor", "Student") AS role, email,password FROM users';

    if (q) {
        const order = q.split('-');
        order[0] === 'name' ? sort.push('full_name') : sort.push(order[0]);
        if (order[1] === 'AZ') sort.push('ASC');
        if (order[1] === 'ZA') sort.push('DESC');
    }

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, mysql.raw(sort.join(' ')), (err, result) => {
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

const loginUser = (data) => {
    const qs = `SELECT * FROM users WHERE username = ? AND password=?`;
    data.password = md5(data.password);
    const tes = [data.username, data.password];

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, tes, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    result = false;
                }
                resolve(result);
                // console.log(result);
            }
        });
    });
};

const getUserRoleById = (role_id) => {
    const qs =
        'SELECT full_name AS name, if(role=1,"Instructor", "Student") AS role, email FROM users WHERE role = ?';

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, role_id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const createUser = (data) => {
    const qs = 'INSERT INTO users SET ?';
    data.password = md5(data.password);

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, data, (err, result) => {
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
                // console.log(result.length);
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

const deleteUserById = (idUser) => {
    const qs = 'DELETE FROM users WHERE id = ? ';

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, idUser, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getAllUsers,
    getUserRoleById,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser,
};
