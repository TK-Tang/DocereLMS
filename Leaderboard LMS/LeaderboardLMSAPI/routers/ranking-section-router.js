const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const RankingSectionController = require("../controllers/ranking-section-controller");

module.exports = function(app){
    app.get("/course/:course_id/leaderboard/:leaderboard_id", AuthService.isAdminForCourse, RankingSectionController.getAllRankingSections);

    app.put("/course/:course_id/leaderboard/:leaderboard_id/rankingsection", AuthService.isAdminForCourse, RankingSectionController.insertRankingSection);

    app.post("/course/:course_id/leaderboard/:leaderboard_id/rankingsection/:ranking_section_id", AuthService.isAdminForCours, RankingSectionController.updateRankingSection);
    
    app.delete("/course/:course_id/leaderboard/:leaderboard_id/rankingsection/:ranking_section_id", AuthService.isAdminForCourse, RankingSectionController.deleteRankingSection)
}