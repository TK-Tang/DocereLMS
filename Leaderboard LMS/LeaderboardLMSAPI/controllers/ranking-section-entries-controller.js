const Responses = require("../helpers/response");
const Models = require("../models");

exports.getRankingSectionEntries = function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10);
    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); }

    Models.RankingSectionEntries.getRankingSectionEntries(ranking_id, Models).then(function(rankingSectionEntry){
        if(!rankingSectionEntry){
            Responses.fail(res, "Sections for this exam/assignment could not be found", null);
        } else {
            Responses.success(res, "Section for this exam/assignment found", rankingSectionEntry);
        }
    });
}

exports.insertRankingSectionEntry = function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10);
    if (isNaN(ranking_id)){ Responses.error(res, "Ranking ID is not a number", null); } 

    const mark = req.body.mark;
    const ranking_section_id = req.body.ranking_section_id

    Models.RankingSectionEntries.insertRankingSectionEntry(ranking_id, ranking_section_id, mark).then(function(rankingSectionEntry){
        if(!rankingSectionEntry){
            Responses.fail(res, "Sections for this exam/assignment could not be created", null);
        } else {
            Responses.success(res, "Section for this exam/assignment created", rankingSectionEntry);
        }
    });
}

exports.updateRankingSectionEntry = function(req, res){
    const ranking_section_entry_id = parseInt(req.params.ranking_section_entry_id, 10);
    if(isNaN(ranking_section_entry_id)){ Responses.error(res, "Ranking section entry ID is not a number", null); } 

    const mark = req.body.mark;

    Models.RankingSectionEntries.updateRankingSectionEntry(ranking_section_entry_id, mark).then(function(rankingSectionEntry){
        if (!ranking_section_entry_id){
            Responses.fail(res, "Sections for this exam/assignment could not be updated", null);
        } else {
            Responses.success(res, "Section for this exam/assignment updated", rankingSectionEntry);
        }
    });
}

exports.deleteRankingSectionEntry = function(req, res){
    const ranking_section_entry_id = parseInt(req.params.ranking_section_entry_id, 10);
    if(isNaN(ranking_section_entry_id)){ Responses.error(res, "Ranking section entry ID is not a number", null); } 
    
    Models.RankingSectionEntries.deleteRankingSectionEntry(ranking_section_entry_id).then(function(numberOfRankingSectionEntriesDeleted){
        if (numberOfRankingSectionEntriesDeleted != 1){
            Responses.fail(res, "Sections for this exam/assignment could not be updated", null);
        } else {
            Responses.success(res, "Section for this exam/assignment updated", numberOfRankingSectionEntriesDeleted);
        }
    });
}