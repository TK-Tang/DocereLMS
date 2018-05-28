const Responses = require("../helpers/response");
const Models = require("../models");

exports.getLeaderboardIncludingRankings = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(leaderboard_id)){ Responses.error(res, "Leaderboard ID is not a number", null); }

    Models.Leaderboards.getLeaderboardIncludingRankings(leaderboard_id, Models).then(async function(leaderboard){ 
        for (var key in leaderboard.Rankings){
            var r = leaderboard.Rankings[key];

            var user = await Models.Users.getUserIncludingCourseAndRole(req.user.id, course_id, Models);
            if (user.Courses[0].Roles.rank === "admin"){
                break;
            }

            if (req.user.id === r.User.user_id){
                break;
            }

            if (r.StudentAnonymitySetting.revealLeaderboardName === false && req.user.email !== r.User.email){
                r.User.id = 0
                r.User.email = "Anonymous",
                r.User.username = "Anonymous",
                r.User.profilePictureLink = "https://www.uts.edu.au/sites/default/files/styles/wysiwyg_generic_large_x1/public/2018-01/sci-advanced-tissue-unknown-female.jpg"
            }
    
            if (r.StudentAnonymitySetting.revealRankingSections === false){
                r.RankingSectionEntries = [];
                r.dataValues.RankingSectionEntries = [];
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
    const course_id = req.params.course_id;
    const name = req.body.name;
    const blurb = req.body.blurb;
    const weight = req.body.weighting;

    if (!name){ Responses.error(res, "Name of the leaderboard cannot be blank", null); }

    Models.Leaderboards.insertLeaderboard(course_id, name, blurb, weighting).then(function(leaderboard){
        if (!leaderboard){
            Responses.fail(res, "Leaderboard could not be created", null);
        } else {
            Responses.success(res, "Leaderboard created", leaderboard);
        }
    });
}

exports.updateLeaderboard = function(req, res){
    const leaderboard_id = parseInt(req.params.leaderboard_id, 10);
    const name = req.body.name;
    const blurb = req.body.blurb;
    const weighting = req.body.weight;

    if (isNaN(weighting)){ Responses.error(res, "Weighting is not a number", null); return; }

    if (!name){ Responses.error(res, "Name of the leaderboard cannot be blank", null); }

    Models.Leaderboards.updateLeaderboard(leaderboard_id, name, blurb, weighting).then(function(leaderboard){
        if(!leaderboard){
            Responses.fail(res, "Leaderboard could not be updated", null);
        } else {
            Responses.success(res, "Leaderboard updated", leaderboard);
        }
    });
}
