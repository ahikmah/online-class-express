const courseModel = require('../models/course');

const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');

const createNewCourse = (req, res) => {
    const { files } = req;
    const banner = `/images/${files[0].filename}`;
    const data = { ...req.body, banner };
    console.log(data);
    courseModel
        .createNewCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const filterCourse = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const { q: search, category, level, price, sort, pages } = req.query;
    courseModel
        .filterCourse(search, category, level, price, sort, pages)
        .then((finalResult) => {
            const { result, count, page, limit } = finalResult;
            const totalPage = Math.ceil(count / limit);

            const url =
                protocol +
                '://' +
                hostname +
                ':' +
                process.env.PORT +
                baseUrl +
                path;

            let prev, next;
            if (!search && !category && !level && !price && !sort) {
                prev = page === 1 ? null : url + `?pages=${page - 1}`;
                next = page === totalPage ? null : url + `?pages=${page + 1}`;
            } else if (search && !category && !level && !price && !sort) {
                prev =
                    page === 1 ? null : url + `?q=${search}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?q=${search}&pages=${page + 1}`;
            } else if (!search && category && !level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?category=${category}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?category=${category}&pages=${page + 1}`;
            } else if (!search && !category && level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?level=${level}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?level=${level}&pages=${page + 1}`;
            } else if (!search && !category && !level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?price=${price}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?price=${price}&pages=${page + 1}`;
            } else if (search && category && !level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&pages=${page + 1}`;
            } else if (search && !category && level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?q=${search}&level=${level}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?q=${search}&level=${level}&pages=${page + 1}`;
            } else if (search && !category && !level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?q=${search}&price=${price}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?q=${search}&price=${price}&pages=${page + 1}`;
            } else if (search && category && level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&pages=${
                              page + 1
                          }`;
            } else if (search && category && !level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (search && !category && level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (search && category && level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (!search && category && level && !price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&level=${level}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&level=${level}&pages=${
                              page + 1
                          }`;
            } else if (!search && category && !level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (!search && !category && level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (!search && category && level && price && !sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&level=${level}&price=${price}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&level=${level}&price=${price}&pages=${
                              page + 1
                          }`;
            } else if (!search && !category && !level && !price && sort) {
                prev =
                    page === 1 ? null : url + `?sort=${sort}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?sort=${sort}&pages=${page + 1}`;
            } else if (search && !category && !level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url + `?q=${search}&sort=${sort}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url + `?q=${search}&sort=${sort}&pages=${page + 1}`;
            } else if (!search && category && !level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (!search && !category && level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?level=${level}&sort=${sort}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?level=${level}&sort=${sort}&pages=${page + 1}`;
            } else if (!search && !category && !level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?price=${price}&sort=${sort}&pages=${page - 1}`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?price=${price}&sort=${sort}&pages=${page + 1}`;
            } else if (!search && category && level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&level=${level}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&level=${level}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (!search && category && !level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (!search && !category && level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?level=${level}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?level=${level}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (!search && category && level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?category=${category}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?category=${category}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && category && !level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && !category && level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&level=${level}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&level=${level}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && !category && !level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && category && level && !price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && category && !level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && !category && level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            } else if (search && category && level && price && sort) {
                prev =
                    page === 1
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page - 1
                          }`;
                next =
                    page === totalPage
                        ? null
                        : url +
                          `?q=${search}&category=${category}&level=${level}&price=${price}&sort=${sort}&pages=${
                              page + 1
                          }`;
            }

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

const getCourseCategory = (req, res) => {
    courseModel
        .getCourseCategory()
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const registerCourse = (req, res) => {
    const data = { ...req.body };
    courseModel
        .registerCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const submitScore = (req, res) => {
    const data = { ...req.body };
    const idChapter = req.params.chapter;
    const idEnroll = req.params.enroll;
    courseModel
        .submitScore(data, idChapter, idEnroll)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
    // console.log(data);
};

const getCourseDetail = (req, res) => {
    const idCourse = req.params.id;
    courseModel
        .getCourseDetail(idCourse)
        .then((result) => {
            writeResponse(res, null, 200, result);
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

module.exports = {
    getCourseCategory,
    createNewCourse,
    registerCourse,
    filterCourse,
    submitScore,
    getCourseDetail,
};
