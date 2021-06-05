const dbMysql = require('../database/mySql');
const mysql = require('mysql');

// student only (for now)
const getAllUser = () => {
    const qs = 'SELECT * FROM users WHERE role = 2';

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getAllUser,
};
