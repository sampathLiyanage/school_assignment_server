module.exports = (app) => {
    const schools = require('../controllers/school.controller.js');

    /**
     * @api {post} /schools Create a School
     * @apiName CreateSchool
     * @apiGroup School
     *
     * @apiParam {String} name name of the school. This field is required. Maximum length of the name is 100
     * @apiParam {String} address address of the school. Maximum length of the address is 1000
     * @apiParam {Integer} noOfStudents number of students
     *
     * @apiSuccess {Json} created school data.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *    {
     *      "_id":"5fe5e6bac89605315223d944",
     *      "name":"Sandalwood Middle School",
     *      "address":"542 Bald Hill Ave Riverview, FL 33569",
     *      "noOfStudents":312,
     *      "createdAt":"2020-12-25T13:18:50.547Z",
     *      "updatedAt":"2020-12-25T13:18:50.547Z"
     *   }
     *
     * @apiError ValidationError validation error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "message": "School validation failed: name: maximum length is 100"
     *     }
     *
     * @apiError GenericError generic error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Some error occurred while retrieving schools"
     *     }
     */
    app.post('/schools', schools.create);

    /**
     * @api {get} /schools?name=:name&address=:address&search=:search Get Schools
     * @apiName GetSchools
     * @apiGroup School
     *
     * @apiParam {String} name name of the school. Part of the name would match the records
     * @apiParam {String} address address of the school. Part of the address would match the records
     * @apiParam {String} search full text search string. Full text search is done to match both name and address
     *
     * @apiSuccess {Json} matching school data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        {
     *         "_id":"5fe5e6bac89605315223d944",
     *         "name":"Sandalwood Middle School",
     *         "address":"542 Bald Hill Ave Riverview, FL 33569",
     *         "noOfStudents":312,
     *         "createdAt":"2020-12-25T13:18:50.547Z",
     *         "updatedAt":"2020-12-25T13:18:50.547Z"
     *      },
     *        {
     *         "_id":"5fe5e6bac89605315223d949",
     *         "name":"Frozen Lake Academy",
     *         "address":"52 Longbranch Ave Carlisle, PA 17013",
     *         "noOfStudents":542,
     *         "createdAt":"2020-12-25T13:18:50.555Z",
     *         "updatedAt":"2020-12-25T13:18:50.555Z"
     *      },
     *        {
     *         "_id":"5fe5e6bac89605315223d948",
     *         "name":"Westwood Charter School",
     *         "address":"686 W. Studebaker Ave Petersburg, VA 23803",
     *         "noOfStudents":124,
     *         "createdAt":"2020-12-25T13:18:50.554Z",
     *         "updatedAt":"2020-12-25T13:18:50.554Z"
     *      }
     *    ]
     *
     * @apiError GenericError Generic error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Some error occurred while retrieving schools"
     *     }
     */
    app.get('/schools', schools.get);

    app.delete('/schools', schools.delete);
}
