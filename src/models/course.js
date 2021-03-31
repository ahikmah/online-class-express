const dbMysql = require('../database/mySql');
const mysql = require('mysql');

const getAllCourse = (query) => {
    const qs = query
        ? "SELECT cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id ?"
        : "SELECT cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id";

    const sort = ['ORDER BY'];

    if (query) {
        const order = query.split('-');
        if (order[0] === 'name') sort.push('cr.name');
        if (order[0] === 'category') sort.push('ct.name');
        if (order[0] === 'level') sort.push('cr.level');
        if (order[0] === 'pricing') sort.push('cr.price');

        if (order[1] === 'AZ') sort.push('ASC');
        if (order[1] === 'ZA') sort.push('DESC');
    }
    const orderData = mysql.raw(sort.join(' '));

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, orderData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const searchCourseAndSort = (query, search) => {
    const sort = ['ORDER BY'];
    const qs = query
        ? `SELECT cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id WHERE cr.name LIKE ?  or ct.name LIKE ? ? `
        : `SELECT cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id WHERE cr.name LIKE ?  or ct.name LIKE ?`;
    if (query) {
        const order = query.split('-');
        if (order[0] === 'category') sort.push('ct.name');
        if (order[0] === 'level') sort.push('cr.level');
        if (order[0] === 'pricing') sort.push('cr.price');

        if (order[1] === 'AZ') sort.push('ASC');
        if (order[1] === 'ZA') sort.push('DESC');
    }
    const orderData = mysql.raw(sort.join(' '));

    const fullQuery = [search, search, orderData];

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, fullQuery, (err, result) => {
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

const getCourseCategory = () => {
    const qs = 'SELECT * FROM categories';
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

const createNewCourse = (data) => {
    const qs = 'INSERT INTO courses SET ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const registerCourse = (data) => {
    const qs = 'INSERT INTO student_course SET ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const submitScore = (data, id) => {
    qs = 'UPDATE student_chapter_progress SET ? WHERE id=?';
    updated = [data, id];

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

module.exports = {
    getAllCourse,
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    submitScore,
};
