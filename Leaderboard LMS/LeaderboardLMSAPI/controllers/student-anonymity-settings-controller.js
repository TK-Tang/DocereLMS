const Responses = require("../helpers/response");
const Models = require("../models");

exports.getStudentAnonymitySettings = async function(req, res){
    const student_anonymity_settings_id = parseInt(req.params.student_anonymity_settings_id, 10);
    const ranking_id = parseInt(req.params.ranking_id, 10);

    if (isNaN(student_anonymity_settings_id)){ Responses.fail(res, "Student anonymity settings ID is not a number", null); }
    if (isNaN(ranking_id)){ Responses.fail(res, "Ranking ID is not a number", null); }

    var ranking = await Models.Rankings.getRankingIncludingStudentAnonymitySettings(ranking_id, Models);

    if (req.user.id !== ranking.StudentAnonymitySettings.user_id){
        Responses.fail(res, "You cannot view this student's anonymity settings", null);
    }

    Models.StudentAnonymitySettings.getStudentAnonymitySettings(student_anonymity_settings_id).then(function(studentAnonymitySettings){
        if (!studentAnonymitySettings){
            Responses.error(res, "The student's anonymity settings could not be retrieved for this ranking at the moment", null);
        } else {
            Responses.success(res, "Student anonymity settings found", studentAnonymitySettings);
        }
    });
}

exports.updateStudentAnonymitySettings = async function(req, res){
    const student_anonymity_settings_id = parseInt(req.params.student_anonymity_settings_id, 10);
    const ranking_id = parseInt(req.params.ranking_id, 10);
    const revealLeaderboardName = req.body.revealLeaderboardName;
    const revealRankingSections = req.body.revealRankingSections;

    if (isNaN(student_anonymity_settings_id)){ Responses.fail(res, "Student anonymity settings ID is not a number", null); }
    if (isNaN(ranking_id)){ Responses.fail(res, "Ranking ID is not a number", null); }

    var ranking = await Models.Rankings.getRankingIncludingStudentAnonymitySettings(ranking_id, Models);

    if (req.user.id !== ranking.StudentAnonymitySettings.user_id){
        Responses.fail(res, "You cannot view this student's anonymity settings", null);
    }

    Models.StudentAnonymitySettings.updateStudentAnonymitySettings(student_anonymity_settings_id, revealLeaderboardName, revealRankingSections).then(function(studentAnonymitySettings){
        if (!studentAnonymitySettings){
            Responses.error(res, "The student's anonymity settings could not be updated for this ranking at the moment", null);
        } else {
            Responses.success(res, "Student anonymity settings updated", studentAnonymitySettings);
        }
    });
}

