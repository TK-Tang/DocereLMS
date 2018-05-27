const Responses = require("../helpers/response");
const Models = require("../models");

exports.getChannel = function(req, res){
    const channel_id = parseInt(req.params.channel_id, 10);
    
    Models.Channels.getChannel(channel_id, Models).then(function(channel){
        if (!channel){
            Responses.fail(res, "Channel could not be loaded", null);
        } else {
            Responses.success(res, "Channel found", channel);
        }
    });
}