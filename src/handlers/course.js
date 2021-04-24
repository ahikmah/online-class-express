const courseModel = require('../models/course');

const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');

const createNewCourse = (req, res) => {
    const { files } = req;
    const instructor_id = req.token__userid;
    const banner = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data =
        files.length > 0
            ? { ...req.body, instructor_id, banner }
            : { ...req.body, instructor_id };
    // console.log(data);
    courseModel
        .createNewCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: 'true',
                message: 'Course created successfully!',
            });
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const createNewChapter = (req, res) => {
    const data = req.body;
    courseModel
        .createNewChapter(data)
        .then((result) => {
            console.log(result);
            writeResponse(res, null, 200, {
                success: true,
                message: 'Course chapters created',
            });
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const deleteCourse = (req, res) => {
    const idCourse = req.params.id;
    courseModel
        .deleteCourse(idCourse)
        .then((result) => {
            console.log(result);
            writeResponse(res, null, 200, {
                success: true,
                message: 'Class has been deleted',
            });
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const getAllCourse = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const { q: search, category, level, price, sort, pages } = req.query;
    const userId = req.token__userid;
    courseModel
        .getAllCourse(search, category, level, price, sort, pages, userId)
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
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const registerCourse = (req, res) => {
    const student_id = req.token__userid;
    const data = { ...req.body, student_id };
    courseModel
        .registerCourse(data)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: true,
                message: 'Register successful',
            });
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
            writeResponse(res, null, 200, {
                success: true,
                message: 'Score submitted',
            });
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
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
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

const postCourseCategory = (req, res) => {
    const { files } = req;
    const thumbnail = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data =
        files.length > 0 ? { ...req.body, thumbnail } : { ...req.body };
    courseModel
        .postCourseCategory(data)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: true,
                message: 'Course category created',
            });
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const updateCourseCategory = (req, res) => {
    const { files } = req;
    const thumbnail = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data =
        files.length > 0 ? { ...req.body, thumbnail } : { ...req.body };
    const idCategory = req.params.id;

    courseModel
        .updateCourseCategory(data, idCategory)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: true,
                message: 'Update successful',
            });
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

const updateCourse = (req, res) => {
    const { files } = req;
    const banner = files.length > 0 ? `/images/${files[0].filename}` : null;
    const data = files.length > 0 ? { ...req.body, banner } : { ...req.body };
    const idCourse = req.params.id;

    courseModel
        .updateCourse(data, idCourse)
        .then((result) => {
            writeResponse(res, null, 200, {
                success: true,
                message: 'Update successful',
            });
        })
        .catch((err) => {
            writeError(res, err.status, {
                success: err.success,
                conflict: err.conflict,
                message: err.msg,
            });
        });
};

module.exports = {
    getCourseCategory,
    postCourseCategory,
    updateCourseCategory,
    deleteCourse,
    updateCourse,
    createNewCourse,
    createNewChapter,
    registerCourse,
    getAllCourse,
    submitScore,
    getCourseDetail,
};
