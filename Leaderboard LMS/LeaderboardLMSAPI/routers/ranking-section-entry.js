const Responses = require("../helpers/response");
const AuthService = require("../middle/authentication-service");
const RankingSectionEntriesController = require("ranking-section-entries-controller");

module.exports = function(app){
    app.get("/course/:course_id/ranking/:ranking_id", AuthService.isStudentOrAdminForCourse, RankingSectionEntriesController.getRankingSectionEntries);

    app.put("/course/:course_id/ranking/:ranking_id/rankingsectionentries", AuthService.isAdminForCourse, RankingSectionEntriesController.insertRankingSectionEntry);

    app.post("/course/:course_id/ranking/:ranking_id/rankingsectionentries/:ranking_section_entry_id", AuthService.isAdminForCourse, RankingSectionEntriesController.updateRankingSectionEntry);

    app.delete("/course/:course_id/ranking/:ranking_id/rankingsectionentries/:ranking_section_entry_id", AuthSservice.isAdminForCourse, RankingSectionEntriesController.deleteRankingSectionEntry);
}