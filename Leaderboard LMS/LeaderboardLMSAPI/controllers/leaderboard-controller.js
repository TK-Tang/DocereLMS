const Responses = require("../helpers/response");
const Models = require("../models");

exports.getLeaderboardIncludingRankings = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); }

    Models.Leaderboards.getLeaderboardIncludingRankings(leaderboard_id, Models).then(function(leaderboard){ 
        if(!leaderboard){
            Responses.fail(res, "Leaderboard not found", null);
        } else {
            Responses.success(res, "Leaderboard found", null);
        }
    });
}

exports.insertLeaderboard = function(req, res){
    const name = req.body.name;
    const blurb = req.body.blurb;

    if (!name){ Responses.error(res, "Name of the leaderboard cannot be blank", null); }

    Model.Leaderboards.insertLeaderboard(name, blurb).then(function(leaderboard){
        if (!leaderboard){
            Responses.fail(res, "Leaderboard could not be created", null);
        } else {
            Responses.success(res, "Leaderboard created", leaderboard);
        }
    });
}

exports.updateLeaderboard = function(req, res){
    const name = req.body.name;
    const blurb = req.body.blurb;

    if (!name){ Responses.error(res, "Name of the leaderboard cannot be blank", null); }

    Model.Leaderboards.updateLeaderboard(name, blurb).then(function(leaderboard){
        if(!leaderboard){
            Responses.fail(res, "Leaderboard could not be updated", null);
        } else {
            Responses.success(res, "Leaderboard updated", leaderboard);
        }
    });
}
