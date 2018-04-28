const courseScript = require("./course-startscript.js");
const roleScript = require("./role-startscript.js");
const userScript = require("./user-startScript.js");
const invitationScript = require("./invitation-startscript.js");
const channelScript = require("./channel-startscript.js");
const chatScript = require("./chat-startscript.js");
const categoryScript = require("./category-startscript.js");
const resourceScript = require("./resource-startscript.js");
const topicScript = require("./topic-startscript.js");
const forumScript = require("./forum-startscript.js");
const postScript = require("./post-startscript.js");
const leaderboardScript = require("./leaderboard-startscript.js");
const rankingSectionScript = require("./ranking-section-startscript.js");
const rankingScript = require("./ranking-startscript.js");
const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function (){
    var userList = userScript.startScript();
    var roleList = roleScript.startScript();
    var courseList = courseScript.startScript();
    var invitationList = invitationScript.startScript();
    var chatList = chatScript.startScript();
    var channelList = channelScript.startScript();
    var categoryList = categoryScript.startScript();
    var resourceList = resourceScript.startScript();
    var forumList = forumScript.startScript();
    var topicList = topicScript.startScript();
    var postList = postScript.startScript();
    var leaderboardList = leaderboardScript.startScript();
    var rankingSectionList = rankingSectionScript.startScript();
    var rankingList = rankingScript.startScript();

    for (var key in courseList){
        var course = courseList[key];
        Models.Courses.create(course);
    };

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };

    for (var key in roleList){
        var role = roleList[key];
        Models.Roles.create(role);
    };

    for (var key in invitationList){
        var invitation = invitationList[key];
        Models.Invitations.create(invitation);
    };

    for (var key in channelList){
        var channel = channelList[key];
        Models.Channels.create(channel);
    };

    for (var key in chatList){
        var chat = chatList[key];
        Models.Chats.create(chat);
    };

    for (var key in categoryList){
        var category = categoryList[key];
        Models.Categories.create(category);
    };

    for (var key in resourceList){
        var resource = resourceList[key];
        Models.Resources.create(resource);
    };

    for(var key in forumList){
        var forum = forumList[key];
        Models.Forums.create(forum);
    };

    for (var key in topicList){
        var topic = topicList[key];
        Models.Topics.create(topic);
    }

    for (var key in postList){
        var post = postList[key];
        Models.Posts.create(post);
    }

    for (var key in leaderboardList){
        var leaderboard = leaderboardList[key];
        Models.Leaderboards.create(leaderboard);
    }

    for (var key in rankingSectionList){
        var rankingSection = rankingSectionList[key];
        Models.RankingSections.create(rankingSection);
    }

    for (var key in rankingList){
        var ranking = rankingList[key];
        Models.Rankings.create(ranking);
    }
};
