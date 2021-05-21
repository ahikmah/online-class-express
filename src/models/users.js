const dbMysql = require('../database/mySql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const updateUserById = (data, idUser) => {
    const checkUser = `SELECT * FROM users WHERE email = ? OR username = ?`;
    const qs = 'UPDATE users SET ? WHERE id = ? ';
    const updated = [data, idUser];
    console.log(data);

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
            : dbMysql.query(
                  checkUser,
                  [data.email, data.username],
                  (err, result) => {
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
                              dbMysql.query(qs, updated, (err, result) => {
                                  if (err) {
                                      reject({ status: 500 });
                                  } else {
                                      resolve(result);
                                  }
                              });
                          }
                      }
                  }
              );
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
