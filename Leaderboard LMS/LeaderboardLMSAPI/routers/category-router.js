const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const ResourcesController = require("../controllers/resources-controller");

module.exports = function(app){
    app.get("/course/:course_id/category/:category_id/resources", AuthService.isStudentOrAdminForCourse, ResourcesController.getResources);
}