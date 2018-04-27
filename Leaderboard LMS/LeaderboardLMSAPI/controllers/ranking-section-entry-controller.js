const Responses = require("../helpers/response");
const Models = require("../models");

exports.getAllRankingSectionEntries = function(res, req){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard Id is not a number", null); }

    Models.RankingSectionEntries.getAllRankingSectionEntries(leaderboard_id).then(function(rankingSectionEntries){
        if (!rankingSectionEntries){
            Responses.fail(res, "No template sections for this assignment/exam could be found", null);
        } else {
            Responses.success(res, "List of template sections for this assignment/exam found", null)
        }
    })
}

exports.insertRankingSectionEntry = function(res, req){
    const name = req.body.name;

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Model.RankingSectionEntries.insertRankingSectionEntry(name).then(function(rankingSectionEntry){
        if(!rankingSectionEntry){
            Responses.fail(res, "Assignment/exam section could not be created", null);
        } else {
            Responses.success(res, "Assignment/exam section created", null);
        }
    });
}

exports.updateRankingSectionEntry = function(res, req){
    const name = req.body.name;

    if (!name){ Responses.error(res, "Name of the assigment/rank section cannot be blank", null); }

    Model.RankingSectionEntries.updateRankingSectionEntry(name).then(function(rankingSectionEntry){
        if(!rankingSectionEntry){
            Responses.fail(res, "Assignment/exam section could not be updated", null);
        } else {
            Responses.success(res, "Assignment/exam section updated", null);
        }
    });
}

exports.deleteRankingSectionEntry = function(res, req){
    const ranking_section_entry_id = parseInt(req.params.ranking_section_entry_id, 10);
    if (isNaN(ranking_section_entry_id)){ Responses.error(res, "", null); }

    Model.RankingSectionEntries.deleteRankingSectionEntry(ranking_section_entry_id).then(function(numberOfRankingSectionEntryDeleted){
        if(numberOfRankingSectionEntryDeleted != 1){
            Responses.error(res, "Error with deleting ranking section entry", null);
        } else {
            Responses.success(res, "Invitation deleted ranking section entry", numberOfRankingSectionEntryDeleted);
        }
    });
}