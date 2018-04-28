const Responses = require("../helpers/response");
const AuthServices = require("../middleware/authentication-service");
const UsersController = require("../controllers/users-controller");

module.exports = function(app){
    app.get("/users/:term", AuthServices.isStudentOrAdminForCourse, UsersController.searchUsers);
}