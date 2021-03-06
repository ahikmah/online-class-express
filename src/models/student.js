const dbMysql = require('../database/mySql');

const getMyClassByIdUser = (idUser, pages) => {
    const qs = `SELECT c.id, u.full_name student_name, c.name course_name, ct.name category, c.description, ROUND(SUM(if(p.score >= 0, 1, 0))/ COUNT(c.name)*100,0) AS progress_in_percent, CASE WHEN (SUM(if(p.score >=0, 1,0))/ COUNT(c.name))= 100 THEN 'completed' ELSE 'ongoing' END AS status, ROUND(AVG(p.score),0) AS score FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id JOIN categories ct ON c.category_id = ct.id WHERE u.id=? GROUP BY c.name ORDER BY sc.id DESC`;

    const paginate = ' LIMIT ? OFFSET ?';

    const fullQuery = qs + paginate;

    const limit = 5;
    const page = Number(pages) || 1;
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        dbMysql.query(fullQuery, [idUser, limit, offset], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    return reject({
                        status: 204,
                        msg: "User ID doesn't exist",
                    });
                }
                const qsCount =
                    'SELECT COUNT (*) AS count FROM(' + qs + ') as count';

                dbMysql.query(qsCount, idUser, (err, data) => {
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

const getMyProgress = (idUser, idCourse) => {
    const qs = `SELECT u.full_name student_name, c.name course_name, DATE_FORMAT(c.schedule, '%Y-%m-%e') as course_schedule, c.start_time, c.end_time,cc.name chapter_name, p.score as score FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE c.id =? AND u.id=?`;

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

const getAllSchedule = (idUser, day) => {
    const qs = day
        ? `SELECT c.id, c.name course_name, c.start_time AS time, c.end_time as end, concat(TIMESTAMPDIFF(MINUTE, c.start_time, c.end_time), ' minutes') AS duration, ROUND(SUM(if(p.score >= 0, 1, 0))/ COUNT(c.name)*100,0) AS progress_in_percent FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN courses c ON c.id= sc.course_id JOIN student_chapter_progress p ON sc.id = p.student_course_id WHERE u.id=? && DATE_FORMAT(c.schedule, '%W')=? GROUP BY c.name ORDER BY time`
        : `SELECT c.id, c.name course_name, c.start_time AS time, c.end_time as end, concat(TIMESTAMPDIFF(MINUTE, c.start_time, c.end_time), ' minutes') AS duration, ROUND(SUM(if(p.score >= 0, 1, 0))/ COUNT(c.name)*100,0) AS progress_in_percent FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN courses c ON c.id= sc.course_id JOIN student_chapter_progress p ON sc.id = p.student_course_id WHERE u.id=? GROUP BY c.name ORDER BY time`;

    return new Promise((resolve, reject) => {
        dbMysql.query(qs, day ? [idUser, day] : idUser, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getMyClassByIdUser,
    getMyProgress,
    getAllSchedule,
};
