const dbMysql = require('../database/mySql');
const mysql = require('mysql');

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

const postCourseCategory = (data) => {
    const qs = 'INSERT INTO categories SET ?';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, data, (err, result) => {
            if (err) {
                reject({ status: 500 });
            } else {
                resolve(result);
            }
        });
    });
};

const updateCourseCategory = (data, idCategory) => {
    const qs = 'UPDATE categories SET ? WHERE id = ? ';
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [data, idCategory], (err, result) => {
            if (err) {
                // console.log(err);
                reject({ status: 500 });
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

const createNewChapter = (data) => {
    const qs = `INSERT INTO course_chapters (courses_id, name) VALUES ?`;
    const chapters = [data.map((item) => [item.courses_id, item.name])];
    // console.log(tes);
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, chapters, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const updateCourse = (data, idCourse) => {
    const qs = 'UPDATE courses SET ? WHERE id = ? ';
    let student_course;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [data, idCourse], (err, result) => {
            if (err) {
                reject({ status: 500 });
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
            if (err) return reject(err);
            const qsEnroll = `SELECT MAX(id) as enroll_id FROM student_course`;
            dbMysql.query(qsEnroll, (err, result) => {
                if (err) return reject(err);
                const { enroll_id } = result[0];
                student_course = result[0];
                const courseID = `SELECT course_id FROM student_course WHERE id=?`;
                dbMysql.query(courseID, enroll_id, (err, result) => {
                    if (err) return reject(err);
                    const { course_id } = result[0];
                    const qsMinMax = `SELECT MIN(id) as minCount, MAX(id) as maxCount FROM course_chapters WHERE courses_id=?`;
                    dbMysql.query(qsMinMax, course_id, (err, result) => {
                        if (err) return reject(err);
                        const { minCount, maxCount } = result[0];
                        console.log(minCount, maxCount, enroll_id);
                        const proc = 'CALL regisChapter (?,?,?)';
                        dbMysql.query(
                            proc,
                            [minCount, maxCount, enroll_id],
                            (err, result) => {
                                console.log(result);
                                if (err) return reject(err);
                                resolve(result);
                            }
                        );
                    });
                });
            });
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

const getAllCourse = (search, category, level, price, sort, pages) => {
    qs = `SELECT cr.id, cr.name, ct.name AS category, CASE WHEN cr.level = 1 THEN 'Beginner' WHEN cr.level = 2 THEN 'Intermediate' WHEN cr.level = 3 THEN 'Advance' END AS 'level', IF(cr.price>0,concat('$',cr.price), 'Free') as price, cr.description FROM courses cr JOIN categories ct ON cr.category_id = ct.id `;

    const qsOrder = [];
    if (sort) {
        const order = sort.split('-');
        if (order[0] === 'category') qsOrder.push(mysql.raw('ct.name'));
        if (order[0] === 'level') qsOrder.push(mysql.raw('cr.level'));
        if (order[0] === 'price') qsOrder.push(mysql.raw('cr.price'));

        if (order[1] === 'AZ') qsOrder.push(mysql.raw('ASC'));
        if (order[1] === 'ZA') qsOrder.push(mysql.raw('DESC'));
    }

    if (search && !category && !level && !price && !sort) {
        qs = qs + `WHERE cr.name LIKE ?`;
        data = ['%' + search + '%'];
    } else if (!search && category && !level && !price && !sort) {
        qs = qs + `WHERE ct.name = ? `;
        data = [category];
    } else if (!search && level && !category && !price && !sort) {
        qs = qs + `WHERE cr.level = ? `;
        data = [level];
    } else if (!search && price && !category && !level && !sort) {
        qs = qs + `WHERE cr.price ? 0 `;
        data = [price === 'free' ? mysql.raw('=') : mysql.raw('>')];
    } else if (!search && category && level && !price && !sort) {
        qs = qs + `WHERE ct.name = ? && cr.level = ?`;
        data = [category, level];
    } else if (!search && category && price && !level && !sort) {
        qs = qs + `WHERE ct.name = ? && cr.price ? 0`;
        data = [category, price === 'free' ? mysql.raw('=') : mysql.raw('>')];
    } else if (!search && level && price && !category && !sort) {
        qs = qs + `WHERE cr.level = ?  && cr.price ? 0`;
        data = [level, price === 'free' ? mysql.raw('=') : mysql.raw('>')];
    } else if (!search && category && level && price && !sort) {
        qs = qs + `WHERE ct.name = ? && cr.level = ?  && cr.price ? 0`;
        data = [
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && !level && !price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name= ?`;
        data = ['%' + search + '%', category];
    } else if (search && !category && level && !price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && cr.level= ?`;
        data = ['%' + search + '%', level];
    } else if (search && !category && !level && price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && cr.price ?0`;
        data = [
            '%' + search + '%',
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && level && !price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name=? && cr.level=?`;
        data = ['%' + search + '%', category, level];
    } else if (search && category && !level && price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && ct.name=? && cr.price?0`;
        data = [
            '%' + search + '%',
            category,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && !category && level && price && !sort) {
        qs = qs + `WHERE cr.name LIKE ? && cr.level=? && cr.price?0`;
        data = [
            '%' + search + '%',
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (search && category && level && price && !sort) {
        qs =
            qs + `WHERE cr.name LIKE ? && ct.name=? &&cr.level=? && cr.price?0`;
        data = [
            '%' + search + '%',
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
        ];
    } else if (!search && !category && !level && !price && sort) {
        qs = qs + 'ORDER BY ? ?';
        data = [...qsOrder];
    } else if (search && !category && !level && !price && sort) {
        qs = qs + 'WHERE cr.name LIKE ? ORDER BY ? ?';
        data = ['%' + search + '%', ...qsOrder];
    } else if (!search && category && !level && !price && sort) {
        qs = qs + 'WHERE ct.name = ? ORDER BY ? ?';
        data = [category, ...qsOrder];
    } else if (!search && !category && level && !price && sort) {
        qs = qs + 'WHERE cr.level = ? ORDER BY ? ?';
        data = [level, ...qsOrder];
    } else if (!search && !category && !level && price && sort) {
        qs = qs + 'WHERE cr.price ? 0 ORDER BY ? ?';
        data = [price === 'free' ? mysql.raw('=') : mysql.raw('>'), ...qsOrder];
    } else if (!search && category && level && !price && sort) {
        qs = qs + 'WHERE ct.name = ? && cr.level=?  ORDER BY ? ?';
        data = [category, level, ...qsOrder];
    } else if (!search && category && !level && price && sort) {
        qs = qs + 'WHERE ct.name = ? && cr.price ? 0 ORDER BY ? ?';
        data = [
            category,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (!search && !category && level && price && sort) {
        qs = qs + 'WHERE cr.level = ? && cr.price ?0 ORDER BY ? ?';
        data = [
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (!search && category && level && price && sort) {
        qs =
            qs +
            'WHERE ct.name = ? && cr.level = ? && cr.price ? 0 ORDER BY ? ?';
        data = [
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (search && category && !level && !price && sort) {
        qs = qs + 'WHERE cr.name LIKE ? && ct.name = ? ORDER BY ? ?';
        data = ['%' + search + '%', category, ...qsOrder];
    } else if (search && !category && level && !price && sort) {
        qs = qs + 'WHERE cr.name LIKE ? && cr.level = ? ORDER BY ? ?';
        data = ['%' + search + '%', level, ...qsOrder];
    } else if (search && !category && !level && price && sort) {
        qs = qs + 'WHERE cr.name LIKE ? && cr.price ? 0 ORDER BY ? ?';
        data = [
            '%' + search + '%',
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (search && category && level && !price && sort) {
        qs =
            qs +
            'WHERE cr.name LIKE ? && ct.name = ? && cr.level = ? ORDER BY ? ?';
        data = ['%' + search + '%', category, level, ...qsOrder];
    } else if (search && category && !level && price && sort) {
        qs =
            qs +
            'WHERE cr.name LIKE ? && ct.name = ? && cr.price  ? 0 ORDER BY ? ?';
        data = [
            '%' + search + '%',
            category,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (search && !category && level && price && sort) {
        qs =
            qs +
            'WHERE cr.name LIKE ? && cr.level = ? && cr.price  ? 0 ORDER BY ? ?';
        data = [
            '%' + search + '%',
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else if (search && category && level && price && sort) {
        qs =
            qs +
            'WHERE cr.name LIKE ? && ct.name = ? && cr.level = ? && cr.price  ? 0 ORDER BY ? ?';
        data = [
            '%' + search + '%',
            category,
            level,
            price === 'free' ? mysql.raw('=') : mysql.raw('>'),
            ...qsOrder,
        ];
    } else {
        data = null;
    }

    const paginate = ' LIMIT ? OFFSET ?';

    const fullQuery = qs + paginate;

    const limit = 5;
    const page = Number(pages) || 1;
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        dbMysql.query(
            fullQuery,
            data ? [...data, limit, offset] : [limit, offset],
            (err, result) => {
                // console.log(fullQuery, data, limit, offset);
                if (err) {
                    reject({ status: 500 });
                } else {
                    const qsCount =
                        'SELECT COUNT(*) AS count FROM(' + qs + ') as count';

                    dbMysql.query(qsCount, data, (err, data) => {
                        if (err) {
                            reject({ status: 500 });
                        } else {
                            const { count } = data[0];
                            let finalResult = {
                                result,
                                count,
                                page,
                                limit,
                            };

                            if (count === 0) {
                                reject({
                                    status: 400,
                                    success: false,
                                    msg:
                                        "That search was amazing, but the world isn't ready for it.",
                                });
                            }

                            resolve(finalResult);
                        }
                    });
                }
            }
        );
    });
};

const getCourseDetail = (idCourse) => {
    const qs = `SELECT c.id, c.name as course_name, ROUND((SELECT COUNT(cc.courses_id) FROM course_chapters cc JOIN student_chapter_progress p ON cc.id=p.course_chapter_id WHERE cc.courses_id=? && p.score IS NOT null)/(SELECT COUNT(cc.courses_id) FROM course_chapters cc JOIN student_chapter_progress p ON cc.id=p.course_chapter_id WHERE cc.courses_id=?)*100,0) AS progress_in_percent, CASE WHEN c.level = 1 THEN 'Beginner' WHEN c.level = 2 THEN 'Intermediate' WHEN c.level = 3 THEN 'Advance' END AS 'level', ct.name as category, IF(c.price>0,concat('$',c.price),'Free') as price, c.description, c.objectives, c.requirements FROM courses c JOIN categories ct ON c.category_id = ct.id WHERE c.id=?`;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [idCourse, idCourse, idCourse], (err, result) => {
            if (err) {
                reject({ status: 500 });
            } else {
                if (result.length === 0) {
                    reject({
                        status: 400,
                        success: false,
                        msg: 'If you were looking for nothing, you found it.',
                    });
                }
                resolve(result);
            }
        });
    });
};

module.exports = {
    getCourseCategory,
    postCourseCategory,
    updateCourseCategory,
    updateCourse,
    createNewCourse,
    createNewChapter,
    registerCourse,
    submitScore,
    getAllCourse,
    getCourseDetail,
};
