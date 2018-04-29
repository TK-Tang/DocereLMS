const Responses = require("../helpers/response");
const Models = require("../models");

exports.getAllRankingSections = function(res, req){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard Id is not a number", null); }

    Models.RankingSections.getAllRankingSections(leaderboard_id).then(function(rankingSections){
        if (!rankingSections){
            Responses.fail(res, "No template sections for this assignment/exam could be found", null);
        } else {
            Responses.success(res, "List of template sections for this assignment/exam found", null)
        }
    })
}

exports.insertRankingSections = function(res, req){
    const name = req.body.name;

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Models.RankingSections.insertRankingSection(name).then(function(rankingSection){
        if(!rankingSection){
            Responses.fail(res, "Assignment/exam section could not be created", null);
        } else {
            Responses.success(res, "Assignment/exam section created", null);
        }
    });
}

exports.updateRankingSection = function(res, req){
    const name = req.body.name;

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Models.RankingSections.updateRankingSection(name).then(function(rankingSection){
        if(!rankingSection){
            Responses.fail(res, "Assignment/exam section could not be updated", null);
        } else {
            Responses.success(res, "Assignment/exam section updated", null);
        }
    });
}

exports.deleteRankingSection = function(res, req){
    const ranking_section_id = parseInt(req.params.ranking_section_id, 10);
    if (isNaN(ranking_section_id)){ Responses.error(res, "Ranking section ID is not a number", null); }

    Models.RankingSections.deleteRankingSection(ranking_section_id).then(function(numberOfRankingSectionDeleted){
        if(numberOfRankingSectionDeleted != 1){
            Responses.error(res, "Error with deleting ranking section", null);
        } else {
            Responses.success(res, "Invitation deleted ranking section", numberOfRankingSectionDeleted);
        }
    });
}