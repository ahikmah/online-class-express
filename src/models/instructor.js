const dbMysql = require('../database/mySql');

const getMemberProgress = (id) => {
    const qs = `SELECT u.full_name student_name, c.name course_name, cc.name chapter_name, IF(p.score>0,p.score,'Unfinished') as score FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE c.id=?`;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getSpesificMemberProgress = (idCourse, idUser) => {
    const qs = `SELECT u.full_name student_name, c.name course_name, cc.name chapter_name, IF(p.score>0,p.score,'Unfinished') as score FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE c.id =? AND u.id=?`;

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

const getMyCourse = (idUser) => {
    const qs = `SELECT c.name, c.start_time, c.end_time, COUNT(sc.student_id) AS member FROM courses c JOIN student_course sc ON c.id = sc.course_id WHERE c.instructor_id= ?  GROUP BY c.name`;
    return new Promise((resolve, reject) => {
        dbMysql.query(qs, idUser, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    getMemberProgress,
    getSpesificMemberProgress,
    getMyCourse,
};
