const Responses = require("../helpers/response");
const Models = require("../models");

exports.getAllRankingSections = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard Id is not a number", null); }

    Models.RankingSections.getAllRankingSections(leaderboard_id).then(function(rankingSections){
        if (!rankingSections){
            Responses.fail(res, "No template sections for this assignment/exam could be found", null);
        } else {
            Responses.success(res, "List of template sections for this assignment/exam found", rankingSections)
        }
    })
}

exports.insertRankingSection = function(req, res){
    const name = req.body.name;
    const leaderboard_id= parseInt(req.params.leaderboard_id, 10);

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Models.RankingSections.insertRankingSection(leaderboard_id, name).then(function(rankingSection){
        if(!rankingSection){
            Responses.fail(res, "Assignment/exam section could not be created", null);
        } else {
            Responses.success(res, "Assignment/exam section created", rankingSection);
        }
    });
}

exports.updateRankingSection = function(req, res){
    const name = req.body.name;
    const ranking_section_id = parseInt(req.params.ranking_section_id, 10);

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Models.RankingSections.updateRankingSection(ranking_section_id, name).then(function(rankingSection){
        if(!rankingSection){
            Responses.fail(res, "Assignment/exam section could not be updated", null);
        } else {
            Responses.success(res, "Assignment/exam section updated", rankingSection);
        }
    });
}

exports.deleteRankingSection = function(req, res){
    const ranking_section_id = parseInt(req.params.ranking_section_id, 10);
    if (isNaN(ranking_section_id)){ Responses.error(res, "Ranking section ID is not a number", null); }

    Models.RankingSections.deleteRankingSection(ranking_section_id, Models).then(function(numberOfRankingSectionDeleted){
        if(numberOfRankingSectionDeleted != 1){
            Responses.error(res, "Error with deleting ranking section", null);
        } else {
            Responses.success(res, "Successfully deleted ranking section", numberOfRankingSectionDeleted);
        }
    });
}