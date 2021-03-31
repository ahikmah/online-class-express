const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
};

const db = mysql.createConnection(config);

module.exports = db;
