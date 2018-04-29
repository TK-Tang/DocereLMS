const Responses = require("../helpers/response");
const Models = require("../models");

exports.getRanking = function(res, req){
    const ranking_id = parseInt(req.params.ranking_id, 10)

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Model.Rankings.getRanking(ranking_id).then(function(ranking){

        if (ranking.StudentAnonymitySettings.revealLeaderboardname === false){
            ranking.Users.email = "Anonymous",
            ranking.Users.username = "Anonymous"
        }

        if (ranking.StudentAnonymitySettings.revealRankingSections === false){
            ranking.RankingSections = null;
        }
        
        if(!ranking){
            Responses.fail(res, "No ranking found", null);
        } else {
            Responses.success(res, "Ranking found", ranking);
        }
    });
}

exports.insertRanking = function(res, req){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);

    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); }

    Model.Rankings.insertRanking(leaderboard_id, note, mark, Models).then(function(ranking){
        if(!ranking){
            Responses.fail(res, "Ranking could not be inserted to this leaderboard");
        } else {
            Responses.success(res, "Ranking inserted into leaderboard", ranking);
        }
    });
}

exports.updateRanking = function(res, req){
    const ranking_id = parseInt(req.params.ranking_id, 10)

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Model.Rankings.updateRanking(ranking_id, note, mark).then(function(ranking){
        if(!ranking){
            Responses.fail(res, "Ranking could not be updated");
        } else {
            Responses.success(res, "Ranking updated", ranking);
        }
    });
}

exports.deleteRanking = function(res, req){
    const ranking_id = parseInt(req.params.ranking_id, 10)

    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Model.Rankings.deleteRanking(ranking_id, Models).then(function(numberOfRankingsDeleted){
        if(numberOfRankingsDeleted != 1){
            Responses.fail(res, "Ranking could not be deleted");
        } else {
            Responses.success(res, "Ranking deleted", numberOfRankingsDeleted);
        }
    });
}