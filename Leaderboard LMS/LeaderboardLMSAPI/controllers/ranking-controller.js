const Responses = require("../helpers/response");
const Models = require("../models");

exports.getRanking = function(req, res){
    const course_id = req.params.course_id;
    const ranking_id = parseInt(req.params.ranking_id, 10);

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Models.Rankings.getRankingIncludingStudentAnonymitySettings(ranking_id, Models).then(async function(ranking){

        var user = await Models.Users.getUserIncludingCourseAndRole(req.user.id, course_id, Models);
        if (user.Courses[0].Roles.rank !== "admin"){
            if (ranking.StudentAnonymitySetting.revealLeaderboardName === false){
                ranking.User.email = "Anonymous",
                ranking.User.username = "Anonymous"
            }
    
            if (ranking.StudentAnonymitySetting.revealRankingSections === false){
                ranking.RankingSectionEntries = [];
                ranking.dataValues.RankingSectionEntries = [];
            }
        }
        
        if(!ranking){
            Responses.fail(res, "No ranking found", null);
        } else {
            Responses.success(res, "Ranking found", ranking);
        }
    });
}

exports.insertRanking = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    const user_id = req.body.user_id;
    const note = req.body.note;
    const mark = req.body.mark;

    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); }

    Models.Rankings.insertRanking(leaderboard_id, user_id, note, mark, Models).then(function(ranking){
        if(!ranking){
            Responses.fail(res, "Ranking could not be inserted to this leaderboard");
        } else {
            Responses.success(res, "Ranking inserted into leaderboard", ranking);
        }
    });
}

exports.updateRanking = function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10)

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Models.Rankings.updateRanking(ranking_id, note, mark).then(function(ranking){
        if(!ranking){
            Responses.fail(res, "Ranking could not be updated");
        } else {
            Responses.success(res, "Ranking updated", ranking);
        }
    });
}

exports.deleteRanking = function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10)

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Models.Rankings.deleteRanking(ranking_id, Models).then(function(numberOfRankingsDeleted){
        if(numberOfRankingsDeleted != 1){
            Responses.fail(res, "Ranking could not be deleted");
        } else {
            Responses.success(res, "Ranking deleted", numberOfRankingsDeleted);
        }
    });
}