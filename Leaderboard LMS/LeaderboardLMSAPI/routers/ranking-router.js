const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const RankingController = require("../controllers/ranking-controller");

module.exports = function(app){
    app.get("/course/:course_id/leaderboard/:leaderboard/ranking/:ranking_id", AuthService.isStudentOrAdminForCourse, RankingController.getRanking);

    app.put("/course/:course_id/leaderboard/:leaderboard/ranking", AuthService.isAdminForCourse, RankingController.insertRanking);

    app.post("/course/:course_id/leaderboard/:leaderboard/ranking/:ranking_id", AuthService.isAdminForCourse, RankingController.updateRanking);

    app.delete("/course/:course_id/leaderboard/:leaderboard/ranking/:ranking_id", AuthService.isAdminForCourse, RankingController.deleteRanking);
}
