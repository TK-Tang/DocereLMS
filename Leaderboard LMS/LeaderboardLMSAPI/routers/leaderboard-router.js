const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const LeaderboardController = require("../controllers/leaderboard-controller");

module.exports = function(app){
    app.get("/course/:course_id/leaderboard/:leaderboard_id", AuthService.isStudentOrAdminForCourse, LeaderboardController.getLeaderboardIncludingRankings);

    app.put("/course/:course_id/leaderboard/", AuthService.isAdminForCourse, LeaderboardController.insertLeaderboard);

    app.post("/course/:course_id/leaderboard/:leaderboard_id", AuthService.isAdminForCourse, LeaderboardController.updateLeaderboard);
}