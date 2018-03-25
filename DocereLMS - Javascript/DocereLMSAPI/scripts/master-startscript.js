const courseScript = require("./course-startscript.js");
const roleScript = require("./role-startscript.js");
const userScript = require("./user-startScript.js");
const invitationScript = require("./invitation-startscript.js");
const forumScript = require("./forum-startscript.js");
const categoryScript = require("./category-startscript.js");
const channelScript = require("./channel-startscript.js");
const chatScript = require("./chat-startscript.js");
const resourceScript = require("./resource-startscript.js");
const topicScript = require("./topic-startscript.js");

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function (){
    var userList = userScript.startScript();
    var roleList = roleScript.startScript();
    var courseList = courseScript.startScript();
    var invitationList = invitationScript.startScript();
    var forumList = forumScript.startScript();
    var categoryList = categoryScript.startScript();
    var chatList = chatScript.startScript();
    var channelList = channelScript.startScript();
    var resourceList = resourceScript.startScript();
    var topicList = topicScript.startScript();

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

    for(var key in forumList){
        var forum = forumList[key];
        Models.Forums.create(forum);
    };

    for (var key in categoryList){
        var category = categoryList[key];
        Models.Categories.create(category);
    };

    for (var key in channelList){
        var channel = channelList[key];
        Models.Channels.create(channel);
    };

    for (var key in chatList){
        var chat = chatList[key];
        Models.Chats.create(chat);
    };

    for (var key in resourceList){
        var resource = resourceList[key];
        Models.Resources.create(resource);
    };

    for (var key in topicList){
        var topic = topicList[key];
        Models.Topics.create(topic);
    }
};
