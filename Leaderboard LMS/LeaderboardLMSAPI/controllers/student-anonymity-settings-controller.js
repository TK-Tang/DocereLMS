const Responses = require("../helpers/response");
const Models = require("../models");

exports.getStudentAnonymitySettings = async function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10);

    if (isNaN(ranking_id)){ Responses.fail(res, "Ranking ID is not a number", null); }

    Models.StudentAnonymitySettings.getStudentAnonymitySettings(ranking_id).then(function(studentAnonymitySettings){
        if (!studentAnonymitySettings){
            Responses.error(res, "The student's anonymity settings could not be retrieved for this ranking at the moment", null);
        } else {
            Responses.success(res, "Student anonymity settings found", studentAnonymitySettings);
        }
    });
}

exports.updateStudentAnonymitySettings = async function(req, res){
    const ranking_id = parseInt(req.params.ranking_id, 10);
    const revealLeaderboardName = req.body.revealLeaderboardName;
    const revealRankingSections = req.body.revealRankingSections;

    if (isNaN(ranking_id)){ Responses.fail(res, "Ranking ID is not a number", null); return; }

    var ranking = await Models.Rankings.getRankingIncludingStudentAnonymitySettings(ranking_id, Models);

    if (req.user.id !== ranking.User.id){
        Responses.fail(res, "You cannot edit this student's anonymity settings", null);
        return;
    }

    Models.StudentAnonymitySettings.updateStudentAnonymitySettings(ranking_id, revealLeaderboardName, revealRankingSections).then(function(studentAnonymitySettings){
        if (!studentAnonymitySettings){
            Responses.error(res, "The student's anonymity settings could not be updated for this ranking at the moment", null);
        } else {
            Responses.success(res, "Student anonymity settings updated", studentAnonymitySettings);
        }
    });
}

