const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const RankingSectionEntryController = require("../controllers/ranking-section-entry-controller");

module.exports = function(app){
    app.get("/course/:course_id/leaderboard/:leaderboard_id", AuthService.isAdminForCourse, RankingSectionEntryController.getAllRankingSectionEntries);

    app.put("/course/:course_id/leaderboard/:leaderboard_id/rankingsectionentry", AuthService.isAdminForCourse, RankingSectionEntryController.insertRankingSectionEntry);

    app.post("/course/:course_id/leaderboard/:leaderboard_id/rankingsectionentry/:ranking_section_entry_id", AuthService.isAdminForCours, RankingSectionEntryController.updateRankingSectionEntry);
    
    app.delete("/course/:course_id/leaderboard/:leaderboard_id/rankingsectionentry/:ranking_section_entry_id", AuthService.isAdminForCourse, RankingSectionEntryController.deleteRankingSectionEntry)
}