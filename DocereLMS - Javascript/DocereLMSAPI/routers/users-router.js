const Responses = require("../helpers/response");
const Models = require("../models");
const AuthServices = require("../middleware/authentication-service");
const UsersController = require("../controllers/users-controller");

module.exports = function(app){
    app.get("/users/:term", AuthServices.isStudentOrAdminForCourse, UsersControllers.searchUsers);
}