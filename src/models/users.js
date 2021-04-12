const dbMysql = require('../database/mySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const updateUserById = (data, idUser) => {
    const qs = 'UPDATE users SET ? WHERE id = ? ';
    const updated = [data, idUser];

    return new Promise((resolve, reject) => {
        data.password
            ? bcrypt.hash(data.password, 10, (err, encryptedPass) => {
                  if (err) return reject({ status: 500 });

                  data.password = encryptedPass;

                  dbMysql.query(qs, updated, (err, result) => {
                      if (err) {
                          reject({
                              status: 500,
                          });
                      } else {
                          if (result.affectedRows === 0)
                              return reject({
                                  status: 401,
                                  success: false,
                                  msg: 'This account does not exist',
                              });
                          resolve(result);
                      }
                  });
              })
            : dbMysql.query(qs, updated, (err, result) => {
                  if (err) {
                      reject({ status: 500 });
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
                reject({ status: 500 });
            } else {
                if (result.length === 0)
                    return reject({
                        status: 401,
                        success: false,
                        msg: 'This account does not exist',
                    });

                result[0].role =
                    result[0].role === 1 ? 'instructor' : 'student';
                resolve(result);
            }
        });
    });
};

module.exports = {
    updateUserById,
    getUserById,
};
