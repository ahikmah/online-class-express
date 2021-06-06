const dbMysql = require('../database/mySql');
const mysql = require('mysql');
const { CLIEngine } = require('eslint');
const db = require('../database/mySql');

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

const sendMessage = (data) => {
    const qs = 'INSERT INTO messages SET ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, data, (err, result) => {
            if (err) {
                console.log(err);
                reject({ status: 500 });
            } else {
                resolve(result);
            }
        });
    });
};

const messageHistory = (room_id) => {
    const qs = 'SELECT * FROM messages WHERE room_id = ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, room_id, (err, result) => {
            if (err) {
                console.log(err);
                reject({ status: 500 });
            } else {
                resolve(result);
            }
        });
    });
};

const messageList = (user_id) => {
    const roomSelect =
        'SELECT id, room_id, sender_id, receiver_id  FROM messages WHERE sender_id = ? OR receiver_id = ? GROUP BY room_id';
    let final = {};
    return new Promise((resolve, reject) => {
        dbMysql.query(roomSelect, [user_id, user_id], (err, data) => {
            if (err) {
                reject({ status: 500 });
            } else {
                final = { ...data };
                let finalResult = [];
                const lastMessage =
                    'SELECT content as last_message, timestamp FROM messages WHERE room_id = ? ORDER BY timestamp DESC LIMIT 1';
                data.map((item, index, array) =>
                    dbMysql.query(
                        lastMessage,
                        [item.room_id],
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                finalResult.push({
                                    ...final[index],
                                    ...result[0],
                                });
                                if (index === array.length - 1) {
                                    finalResult.sort((a, b) =>
                                        a.timestamp > b.timestamp
                                            ? -1
                                            : a.timestamp < b.timestamp
                                            ? 1
                                            : 0
                                    );
                                    resolve(finalResult);
                                }
                            }
                        }
                    )
                );
            }
        });
    });
};

module.exports = {
    getAllUser,
    createRoom,
    sendMessage,
    messageHistory,
    messageList,
};
