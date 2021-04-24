const studentModel = require('../models/student');
const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');

const getMyClassByIdUser = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const idUser = req.token__userid;
    const { pages } = req.query;
    studentModel
        .getMyClassByIdUser(idUser, pages)
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
            writeError(res, err.status, {
                message: err.msg,
            });
        });
};

const getMyProgress = (req, res) => {
    const idUser = req.token__userid;
    const idCourse = req.params.course;

    studentModel
        .getMyProgress(idUser, idCourse)
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

const getAllSchedule = (req, res) => {
    const idUser = req.token__userid;
    const day = req.query.day;

    studentModel
        .getAllSchedule(idUser, day)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

module.exports = {
    getMyClassByIdUser,
    getMyProgress,
    getAllSchedule,
};
