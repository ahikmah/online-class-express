const instructorModel = require('../models/instructor');
const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');
// const getMemberProgress = (req, res) => {
//     const idCourse = req.params.id;
//     instructorModel
//         .getMemberProgress(idCourse)
//         .then((result) => {
//             writeResponse(res, null, 200, result);
//         })
//         .catch((err) => {
//             writeError(res, 500, err);
//         });
// };

const getSpesificMemberProgress = (req, res) => {
    const idCourse = req.params.course;
    const idUser = req.params.user;

    instructorModel
        .getSpesificMemberProgress(idCourse, idUser)
        .then((result) => {
            // console.log(result);
            result.map((item) => {
                if (item.score) {
                    item.score = item.score;
                } else if (item.score === 0) {
                    item.score = item.score;
                } else {
                    item.score = 'Unfinished';
                }
            });
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMyCourse = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const { pages } = req.query;
    const idUser = req.token__userid;
    instructorModel
        .getMyCourse(idUser, pages)
        .then((finalResult) => {
            const { result, count, page, limit } = finalResult;
            const totalPage = Math.ceil(count / limit) || 1;

            const url =
                protocol +
                '://' +
                hostname +
                ':' +
                process.env.PORT +
                baseUrl +
                path;

            const prev = page === 1 ? null : url + `?pages=${page - 1}`;
            const next = page === totalPage ? null : url + `?pages=${page + 1}`;
            const info = {
                count,
                page,
                totalPage,
                next,
                prev,
            };
            writeResponsePaginated(res, 200, info, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getCourseMember = (req, res) => {
    const idCourse = req.params.course;
    instructorModel
        .getCourseMember(idCourse)
        .then((result) => {
            // console.log(result);
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMySchedule = (req, res) => {
    const idUser = req.token__userid;
    const day = req.query.day;
    // console.log(idUser);

    instructorModel
        .getMySchedule(idUser, day)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, err.status, {
                message: err.msg,
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
