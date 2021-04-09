const studentModel = require('../models/student');
const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');

const getMyClass = (req, res) => {
    studentModel
        .getMyClass()
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getMyClassByIdUser = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const idUser = req.params.id;
    const { pages } = req.query;
    studentModel
        .getMyClassByIdUser(idUser, pages)
        .then((finalResult) => {
            const { result, count, page, limit } = finalResult;
            const totalPage = Math.ceil(count / limit);
            console.log(finalResult);
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

const getAllSchedule = (req, res) => {
    const idUser = req.params.id;
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
    getMyClass,
    getMyClassByIdUser,
    getAllSchedule,
};
