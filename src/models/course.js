const dbMysql = require('../database/mySql');
const mysql = require('mysql');

const getAllCourse = (pages) => {
    const qs =
        "SELECT cr.id, cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id";

    const paginate = ' LIMIT ? OFFSET ?';

    const fullQuery = qs + paginate;

    const limit = 5;
    const page = Number(pages) || 1;
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        dbMysql.query(fullQuery, [limit, offset], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const qsCount =
                    'SELECT COUNT(*) AS count FROM(' + qs + ') as count';
                dbMysql.query(qsCount, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const { count } = data[0];
                        let finalResult = {
                            result,
                            count,
                            page,
                            limit,
                        };
                        resolve(finalResult);
                    }
                });
            }
        });
    });
};

const searchCourseAndSort = (query, search, pages) => {
    const sort = ['ORDER BY'];
    const qs = query
        ? `SELECT cr.id, cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id WHERE cr.name LIKE ?  ? `
        : `SELECT cr.id, cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id WHERE cr.name LIKE ?`;

    if (query) {
        const order = query.split('-');
        if (order[0] === 'category') sort.push('ct.name');
        if (order[0] === 'level') sort.push('cr.level');
        if (order[0] === 'pricing') sort.push('cr.price');

        if (order[1] === 'AZ') sort.push('ASC');
        if (order[1] === 'ZA') sort.push('DESC');
    }
    const orderData = mysql.raw(sort.join(' '));

    const paginate = ' LIMIT ? OFFSET ?';

    const fullQuery = qs + paginate;
    const limit = 5;
    const page = Number(pages) || 1;
    const offset = (page - 1) * limit;

    const qOpt = query
        ? [search, orderData, limit, offset]
        : [search, limit, offset];

    return new Promise((resolve, reject) => {
        dbMysql.query(fullQuery, qOpt, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const qsCount =
                    'SELECT COUNT(*) AS count FROM(' + qs + ') as count';

                dbMysql.query(
                    qsCount,
                    query ? [search, orderData] : search,
                    (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            const { count } = data[0];
                            let finalResult = {
                                result,
                                count,
                                page,
                                limit,
                            };

                            if (finalResult.length === 0) {
                                result = false;
                            }

                            resolve(finalResult);
                        }
                    }
                );
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

const submitScore = (data, idChapter, idEnroll) => {
    qs =
        'UPDATE student_chapter_progress SET ? WHERE course_chapter_id=? && student_course_id=?';

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [data, idChapter, idEnroll], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const filterCourse = (search, category, level, price) => {
    qs = `SELECT cr.id, cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id `;

    if (search && !category && !level && !price) {
        qs = qs + `WHERE cr.name LIKE ?`;
        data = '%' + search + '%';
    } else if (!search && category && !level && !price) {
        qs = qs + `WHERE ct.name = ? `;
        data = category;
    } else if (!search && level && !category && !price) {
        qs = qs + `WHERE cr.level = ? `;
        data = level;
    } else if (!search && price && !category && !level) {
        qs = qs + `WHERE cr.price ? 0 `;
        data = price === 'free' ? mysql.raw('=') : mysql.raw('>');
    } else if (!search && category && level && !price) {
        qs = qs + `WHERE ct.name = ? && cr.level = ?`;
        data = [category, level];
    } else if (!search && category && price && !level) {
        qs = qs + `WHERE ct.name = ? && cr.price ? 0`;
        data = [category, price === 'free' ? mysql.raw('=') : mysql.raw('>')];
    } else if (!search && level && price && !category) {
        qs = qs + `WHERE cr.level = ?  && cr.price ? 0`;
        data = [level, price === 'free' ? mysql.raw('=') : mysql.raw('>')];
    } else if (!search && category && level && price) {
        qs = qs + `WHERE ct.name = ? && cr.level = ?  && cr.price ? 0`;
        data = [
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && !level && !price) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name= ?`;
        data = ['%' + search + '%', category];
    } else if (search && !category && level && !price) {
        qs = qs + `WHERE cr.name LIKE ? && cr.level= ?`;
        data = ['%' + search + '%', level];
    } else if (search && !category && !level && price) {
        qs = qs + `WHERE cr.name LIKE ? && cr.price ?0`;
        data = [
            '%' + search + '%',
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && level && !price) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name=? && cr.level=?`;
        data = ['%' + search + '%', category, level];
    } else if (search && category && !level && price) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name=? && cr.price?0`;
        data = [
            '%' + search + '%',
            category,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && !category && level && price) {
        qs = qs + `WHERE cr.name LIKE ? && cr.level=? && cr.price?0`;
        data = [
            '%' + search + '%',
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && level && price) {
        qs =
            qs + `WHERE cr.name LIKE ? && ct.name=? &&cr.level=? && cr.price?0`;
        data = [
            '%' + search + '%',
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else {
        data = null;
    }

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

const getCourseDetail = (idCourse) => {
    const qs = `SELECT c.id, c.name as course_name, CASE WHEN c.level = 1 THEN 'Beginner'
    WHEN c.level = 2 THEN 'Intermediate' WHEN c.level = 3 THEN 'Advance'
    END AS 'level', ct.name as category, IF(c.price>0,concat('$',c.price),'Free') as price,
    c.description, c.objectives, c.requirements FROM courses c JOIN categories ct ON c.category_id = ct.id
    WHERE c.id=?`;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, idCourse, (err, result) => {
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
    filterCourse,
    getCourseDetail,
};
