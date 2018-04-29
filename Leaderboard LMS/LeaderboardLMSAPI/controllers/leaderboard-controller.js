const Responses = require("../helpers/response");
const Models = require("../models");

exports.getLeaderboardIncludingRankings = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); }

    Models.Leaderboards.getLeaderboardIncludingRankings(leaderboard_id, Models).then(async function(leaderboard){ 
        for (var r in leaderboard.Rankings){
            var user = await Models.Users.getUserIncludingCourseAndRole(req.user.id, course_id, Models);
            if (user.Courses[0].Roles.rank === "admin"){
                continue;
            }

            if (req.user.id === r.Users.user_id){
                continue;
            }

            if (r.StudentAnonymitySettings.revealLeaderboardname === false){
                r.Users.email = "Anonymous",
                r.Users.username = "Anonymous"
            }
    
            if (r.StudentAnonymitySettings.revealRankingSections === false){
                r.RankingSections = null;
            }
        }

        if(!leaderboard){
            Responses.fail(res, "Leaderboard not found", null);
        } else {
            Responses.success(res, "Leaderboard found", leaderboard);
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
    const course_id = req.params.course_id;

    if (!name){ Responses.error(res, "Name of the leaderboard cannot be blank", null); }

    Model.Leaderboards.updateLeaderboard(course_id, name, blurb).then(function(leaderboard){
        if(!leaderboard){
            Responses.fail(res, "Leaderboard could not be updated", null);
        } else {
            Responses.success(res, "Leaderboard updated", leaderboard);
        }
    });
}
