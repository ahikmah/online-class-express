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

const createRoom = (data) => {
    check_room = 'SELECT * FROM chat_rooms WHERE room_id = ?';
    room = data[0].room_id;
    // console.log(room);
    qs = 'INSERT INTO chat_rooms (room_id, member_id) VALUES ?';
    members = [data.map((item) => [item.room_id, item.member_id])];

    return new Promise((resolve, reject) => {
        dbMysql.query(check_room, room, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result);
                } else {
                    dbMysql.query(qs, members, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                }
            }
        });
    });
};

module.exports = {
    getAllUser,
    createRoom,
};
