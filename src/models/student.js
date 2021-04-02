const dbMysql = require('../database/mySql');

const getMyClass = () => {
    const qs = `SELECT 	u.full_name student_name, c.name course_name, SUM(if(p.score > 0, 1, 0))/ COUNT(p.score)*100  AS progress_in_percent, CASE WHEN (SUM(if(p.score > 0, 1, 0))/ COUNT(p.score)*100) = 100 THEN 'completed' ELSE 'ongoing' END AS status, SUM(if(p.score > 0, p.score, 0))/ SUM(if(p.score > 0, 1, 0)) AS score FROM users u JOIN student_course sc  ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id GROUP BY sc.id`;

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

const getMyClassByIdUser = (idUser) => {
    const qs = `SELECT c.id, u.full_name student_name, c.name course_name, ct.name category, c.description, ROUND(SUM(if(p.score > 0, 1, 0))/ COUNT(c.name)*100,0) AS progress_in_percent, CASE WHEN (SUM(if(p.score >0, 1,0))/ COUNT(c.name))= 100 THEN 'completed' ELSE 'ongoing' END AS status, ROUND(AVG(p.score),0) AS score FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id JOIN categories ct ON c.category_id = ct.id WHERE u.id=6 GROUP BY c.name`;

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

const getAllSchedule = (idUser) => {
    const qs = `SELECT 
	c.name course_name, c.start_time AS time, concat(TIMESTAMPDIFF(MINUTE, c.start_time, c.end_time), ' minutes') AS duration FROM users u JOIN student_course sc ON u.id = sc.student_id JOIN student_chapter_progress p ON sc.id = p.student_course_id JOIN course_chapters cc ON cc.id = p.course_chapter_id JOIN courses c ON cc.courses_id = c.id WHERE u.id=? GROUP BY c.name`;
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
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
};
