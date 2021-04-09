const courseModel = require('../models/course');
const {
    writeResponse,
    writeError,
    writeResponsePaginated,
} = require('../helper/response');

const searchCourseAndSort = (req, res) => {
    const { baseUrl, path, hostname, protocol } = req;
    const { sort, q, pages } = req.query;
    const search = '%' + q + '%';
    search === '%undefined%'
        ? courseModel
              .getAllCourse(pages)
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

                  const prev = page === 1 ? null : url + `?pages=${page - 1}`;
                  const next =
                      page === totalPage ? null : url + `?pages=${page + 1}`;
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
              })
        : courseModel
              .searchCourseAndSort(sort, search, pages)
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

                  const prev =
                      page === 1 ? null : url + `?q=${q}&pages=${page - 1}`;
                  const next =
                      page === totalPage
                          ? null
                          : url + `?q=${q}&pages=${page + 1}`;
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

const filterCourse = (req, res) => {
    const { q: search, category, level, price } = req.query;

    courseModel
        .filterCourse(search, category, level, price)
        .then((result) => {
            writeResponse(res, null, 200, result);
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

const createNewCourse = (req, res) => {
    const data = { ...req.body };
    courseModel
        .createNewCourse(data)
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
    searchCourseAndSort,
    getCourseCategory,
    createNewCourse,
    registerCourse,
    filterCourse,
    submitScore,
    getCourseDetail,
};
