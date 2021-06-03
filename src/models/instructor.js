const { off } = require('../database/mySql');
const dbMysql = require('../database/mySql');

const getSpesificMemberProgress = (idCourse, idUser) => {
    const qs = `SELECT u.full_name student_name, c.name course_name, cc.id as chapter_id, cc.name chapter_name, p.score as score, sc.id as enroll_id  FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE c.id =? AND u.id=?`;

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [idCourse, idUser], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getMyCourse = (idUser, pages) => {
    const qs = `SELECT c.id as course_id, c.name as course_name, ct.name as category, c.description, c.objectives, c.requirements, DATE_FORMAT(c.schedule, '%W') as day, c.start_time, c.end_time, 0 as num_of_student, c.banner FROM courses c JOIN categories ct ON c.category_id = ct.id WHERE c.instructor_id=? && c.name NOT IN (SELECT c.name FROM courses c JOIN student_course sc ON c.id = sc.course_id) UNION SELECT c.id as course_id, c.name as course_name, ct.name as category, c.description, c.objectives, c.requirements, DATE_FORMAT(c.schedule, '%W') as day, c.start_time, c.end_time, COUNT(sc.student_id) AS num_of_student, c.banner  FROM courses c JOIN student_course sc ON c.id = sc.course_id  JOIN categories ct ON c.category_id = ct.id WHERE c.instructor_id=? GROUP BY c.name `;

    const paginate = ' LIMIT ? OFFSET ?';

    const fullQuery = qs + paginate;

    const limit = 5;
    const page = Number(pages) || 1;
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        dbMysql.query(
            fullQuery,
            [idUser, idUser, limit, offset],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const qsCount =
                        'SELECT COUNT (*) AS count FROM(' + qs + ') as count';

                    dbMysql.query(qsCount, [idUser, idUser], (err, data) => {
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
            }
        );
    });
};

const getCourseMember = (idCourse) => {
    const qs = `SELECT DISTINCT u.id, u.full_name, u.avatar, u.username, c.name course_name FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE c.id =?`;

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

const getMySchedule = (idUser, day) => {
    const qs = `SELECT c.id as course_id, c.name as course_name, ct.name as category, c.description, DATE_FORMAT(c.schedule, '%W') as day, c.start_time, c.end_time, COUNT(sc.student_id) AS num_of_member  FROM courses c JOIN student_course sc ON c.id = sc.course_id  JOIN categories ct ON c.category_id = ct.id WHERE c.instructor_id=? && DATE_FORMAT(c.schedule, '%W')=? GROUP BY c.name
    UNION SELECT c.id as course_id, c.name as course_name, ct.name as category, c.description, DATE_FORMAT(c.schedule, '%W') as day, c.start_time, c.end_time, 0 as num_of_member FROM courses c JOIN categories ct ON c.category_id = ct.id WHERE c.instructor_id=? && DATE_FORMAT(c.schedule, '%W')=? && c.name NOT IN (SELECT c.name FROM courses c JOIN student_course sc ON c.id = sc.course_id) ORDER BY start_time`;

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, [idUser, day, idUser, day], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) return reject({ status: 204 });
                resolve(result);
            }
        });
    });
};

module.exports = {
    // getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
    getCourseMember,
    getMySchedule,
};
